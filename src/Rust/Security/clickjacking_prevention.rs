use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;

pub struct  ClickjackingPrevention;

impl Fairing for ClickjackingPrevention {
    fn on_response(&self,_: &Request, response: &mut Response) {
        response.adjoin(Header::new("X-Frame-Options", "DENY"));
    }

    fn info(&self) -> Info {
        Info {
            name: "Clickjacking Prevention",
            kind: Kind::Response,
        }
    }
}

fn main() {
    rocket::ignite()
       .attach(ClickjackingPrevention)
       .mount("/", routes![../../../index.html])
       .launch();
}