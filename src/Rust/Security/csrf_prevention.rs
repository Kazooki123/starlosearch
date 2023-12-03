use iron::middleware::BeforeMiddleware;
use iron::prelude::*;
use iron::{Request, IronResult};
use iron::typemap::Key;
use rand::{rngs::OsRng, RngCore};

pub struct CsrfToken(pub String);

impl Key for CsrfToken {
    type Value = String;
}

pub struct CsrfProtection;

impl BeforeMiddleware for CsrfProtection {
    fn before(&self, req: &mut Request) -> IronResult<()> {
        let token = req.get::<persistent::Read<CsrfToken>>();

        match token {
            Ok(token) => {
                let headers = req.headers.get_raw("X-CSRF-Token");

                match headers {
                    Some(headers) => {
                        let headers = headers.iter().map(|x| String::from_utf8(x.clone().into()).unwrap()).collect::<Vec<String>>();

                        if headers.contains(&token.0) {
                            Ok(())
                        } else {
                            Err(IronError::new(StringError(String::from("CSRF token mismatch")), iron::status::Forbidden))
                        }
                    },
                    None => Err(IronError::new(StringError(String::from("CSRF token not found")), iron::status::Forbidden))
                }
            },
            Err(_) => Err(IronError::new(StringError(String::from("no CSRF token found in session")), iron::status::Forbidden))
        }
    }
}

pub struct GenerateCsrfToken;

impl BeforeMiddleware for GenerateCsrfToken {
    fn before(&self, req: &mut Request) -> IronResult<()> {
        let session = req.extensions.get::<persistent::Read<CsrfToken>>();

        if session.is_none() {
            let mut rng = OsRng;
            let mut buffer = [0; 1024];
            rng.fill_bytes(&mut buffer);

            req.extensions.insert::<CsrfToken>(format!("{:?}", buffer));
        }

        Ok(())
    }
}