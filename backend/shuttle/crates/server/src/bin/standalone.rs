use redenvelopeframes_server::{
    error::ServerError, router::Config, standalone,
};

#[tokio::main]
async fn main() -> Result<(), ServerError> {
    dotenvy::from_filename("Secrets.toml").map_err(|e| ServerError {
        message: format!("{}", e),
    })?;
    // let mnemonic = std::env::var("MNEMONIC").unwrap();
    let private_key_hex = std::env::var("PRIVATE_KEY_HEX").unwrap();
    let rpc_url = std::env::var("RPC_URL").unwrap();
    // let config = Config { mnemonic, rpc_url };
    let config = Config { private_key_hex, rpc_url };
    standalone::run(config).await
}
