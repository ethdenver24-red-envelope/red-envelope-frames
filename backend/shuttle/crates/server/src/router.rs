use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use redenvelopeframes_adapter::{call_contract, error, PrivateKeyTypes};
use serde::Deserialize;

#[derive(Debug, Clone)]
pub struct Config {
    // pub mnemonic: String,
    pub private_key_hex: String,
    pub rpc_url: String,
}

#[derive(Debug, Clone)]
struct AppState {
    config: Config,
}

pub fn app(config: Config) -> Router {
    let app: Router = Router::new()
        .route("/", get(root))
        .route("/claim", post(create_transactions))
        .with_state(AppState { config });
    app
}

async fn root() -> &'static str {
    "Hello, World!"
}

async fn create_transactions(
    State(state): State<AppState>,
    Json(payload): Json<CreateTransaction>,
) -> Result<(), StatusCode> {
    println!("user_address: {}", payload.user_address);
    println!("contract_address: {}", payload.contract_address);

    call_claim_transaction(
        payload.user_address,
        payload.contract_address,
        state,
    )
    .await
    .map_err(|e| {
        println!("Error: {}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(())
}

async fn call_claim_transaction(
    address: String,
    contract_address: String,
    app_state: AppState,
) -> Result<(), error::AdapterError> {
    // let mnemonic = app_state.config.mnemonic.clone();
    let private_key_hex = app_state.config.private_key_hex.clone();
    let rpc_url = app_state.config.rpc_url.clone();
    // call_contract(address, contract_address, mnemonic, rpc_url).await
    call_contract(
        address,
        contract_address,
        PrivateKeyTypes::PrivateKeyHex(private_key_hex),
        rpc_url,
    )
    .await
}

#[derive(Deserialize)]
struct CreateTransaction {
    user_address: String,
    contract_address: String,
}
