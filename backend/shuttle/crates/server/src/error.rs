use std::error::Error;
use std::fmt;

#[derive(Debug)]
pub struct ServerError {
    pub message: String,
}

impl fmt::Display for ServerError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl Error for ServerError {
    fn description(&self) -> &str {
        &self.message
    }
}
