pub mod error;
pub mod ethrs;

pub enum PrivateKeyTypes {
    Mnemonic(String),
    PrivateKeyHex(String),
}

pub async fn call_contract(
    address: String,
    contract_address: String,
    key: PrivateKeyTypes,
    rpc_url: String,
) -> Result<(), error::AdapterError> {
    ethrs::send_claim_transaction(address, contract_address, key, rpc_url).await
}
