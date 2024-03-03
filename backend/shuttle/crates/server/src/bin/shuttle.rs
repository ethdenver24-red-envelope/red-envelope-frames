use anyhow::anyhow;
use redenvelopeframes_server::{router::Config, shuttle};
use shuttle_axum::ShuttleAxum;
use shuttle_secrets::{SecretStore, Secrets};

#[shuttle_runtime::main]
async fn main(#[Secrets] secret_store: SecretStore) -> ShuttleAxum {
    // let mnemonic = if let Some(mnemonic) = secret_store.get("MNEMONIC") {
    //     mnemonic
    // } else {
    //     return Err(anyhow!("mnemonic was not found").into());
    // };
    let private_key_hex =
        if let Some(private_key_hex) = secret_store.get("PRIVATE_KEY_HEX") {
            private_key_hex
        } else {
            return Err(anyhow!("private_key_hex was not found").into());
        };
    let rpc_url = if let Some(rpc_url) = secret_store.get("RPC_URL") {
        rpc_url
    } else {
        return Err(anyhow!("rpc url was not found").into());
    };
    // let config = Config { mnemonic, rpc_url };
    let config = Config {
        private_key_hex,
        rpc_url,
    };
    shuttle::run(config).await
}
