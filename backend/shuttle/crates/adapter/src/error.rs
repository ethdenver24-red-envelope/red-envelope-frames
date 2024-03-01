use std::error::Error;
use std::fmt;

#[derive(Debug, Clone)]
pub struct AdapterError {
    pub message: String,
}

impl fmt::Display for AdapterError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl Error for AdapterError {
    fn description(&self) -> &str {
        &self.message
    }
}
