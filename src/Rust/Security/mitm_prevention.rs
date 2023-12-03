use reqwest::Error;
use rustls::{Certificate, PrivateKey};
use webpki::DNSNameRef;

fn mitm_prevention(url: &str) -> Result<bool, Error> {
    let response = reqwest::get(url)?;

    let certificate = response.certificate()?;

    let certificate_chain = vec![certificate];
    let server_name = DNSNameRef::try_from_ascii_str("starlosearch.vercel.app").unwrap();
    let trust_anchors = rustls::TLSClientTrustAnchors::new(&[Certificate(certificate.to_vec())]);
    let trust_root_store = rustls::TLSClientTrustAnchors::new(&[]);
    let trust_roots = &[&trust_anchors, &trust_root_store].iter().map(|v| &**v).collect::<rustls::RootCertStore>();
    let config = rustls::ClientConfig::builder()
        .with_safe_defaults()
        .with_root_certificates(trust_roots)
        .with_no_client_auth();
    let server_cert = certificate_chain[0].0.clone();
    let now = webpki::Time::try_from(std::time::SystemTime::now()).unwrap();
    config.verify_client_cert(&server_cert, &certificate_chain[1..], &server_name, &mut webpki::EndEntityServerAuth::new(now))?;

    Ok(true)
}