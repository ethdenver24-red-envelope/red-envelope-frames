use super::error::AdapterError;
use super::PrivateKeyTypes;
use alloy_signer::coins_bip39::English;
use ethers::prelude::*;
use ethers::signers::MnemonicBuilder;
use std::sync::Arc;

const DEFAULT_DERIVATION_PATH: &str = "m/44'/60'/0'/0/0";

pub async fn send_claim_transaction(
    address: String,
    contract_address: String,
    key: PrivateKeyTypes,
    rpc_url: String,
) -> Result<(), AdapterError> {
    let derivation_path = DEFAULT_DERIVATION_PATH.to_string();

    let provider: Provider<Http> = get_provider(rpc_url)?;

    let chain_id = provider.get_chainid().await.map_err(|e| {
        let msg = format!("Error creating wallet from mnemonic: {}", e);
        let err = AdapterError { message: msg };
        err
    })?;

    let wallet: LocalWallet = match key {
        PrivateKeyTypes::Mnemonic(mnemonic) => {
            wallet_from_mnemonic(mnemonic, derivation_path)?
        }
        PrivateKeyTypes::PrivateKeyHex(private_key_hex) => {
            let wallet = wallet_from_private_key_hex(
                private_key_hex,
                chain_id.as_u64(),
            )?;
            wallet
        }
    };

    let client = SignerMiddleware::new(provider, wallet);
    let client = Arc::new(client);

    let contract_address: Address = contract_address.parse().map_err(|e| {
        let msg = format!("Error creating wallet from mnemonic: {}", e);
        let err = AdapterError { message: msg };
        err
    })?;
    let recipient_address: Address = address.parse().map_err(|e| {
        let msg = format!("Error creating wallet from mnemonic: {}", e);
        let err = AdapterError { message: msg };
        err
    })?;

    // abigen!(
    //     RedEnvelope,
    //     "./../../hardhat/artifacts/contracts/RedEnvelope.sol/RedEnvelope.json"
    // );
    abigen!(RedEnvelope, "./RedEnvelope.json");
    let contract = RedEnvelope::new(contract_address, client.clone());

    let claim_call = contract.claim(recipient_address);

    let tx = claim_call.send().await.map_err(|e| {
        let msg = format!("Error creating wallet from mnemonic: {}", e);
        let err = AdapterError { message: msg };
        err
    })?;

    println!("Transaction receipt: {:?}", tx);

    Ok(())
}

fn get_provider(rpc_url: String) -> Result<Provider<Http>, AdapterError> {
    let provider = Provider::<Http>::try_from(rpc_url).map_err(|e| {
        let msg = format!("Error creating wallet from mnemonic: {}", e);
        let err = AdapterError { message: msg };
        err
    })?;

    Ok(provider)
}

fn wallet_from_private_key_hex(
    private_key_hex: String,
    chain_id: u64,
) -> Result<LocalWallet, AdapterError> {
    let wallet = private_key_hex
        .parse::<LocalWallet>()
        .map_err(|e| {
            let msg = format!("Error creating wallet from mnemonic: {}", e);
            let err = AdapterError { message: msg };
            err
        })?
        .with_chain_id(chain_id);
    Ok(wallet)
}

fn wallet_from_mnemonic(
    mnemonic: String,
    derivation_path: String,
) -> Result<LocalWallet, AdapterError> {
    let wallet = MnemonicBuilder::<English>::default()
        .phrase(mnemonic.as_str())
        // .derivation_path(&derivation_path)
        // .map_err(|e| {
        //     let msg = format!("Error creating wallet from mnemonic: {}", e);
        //     let err = AdapterError { message: msg };
        //     err
        // })?
        .build()
        .map_err(|e| {
            let msg = format!("Error creating wallet from mnemonic: {}", e);
            let err = AdapterError { message: msg };
            err
        })?;
    Ok(wallet)
}

mod tests {
    use super::*;
    use anyhow::Error;

    #[tokio::test]
    async fn test_wallet_from_mnnemonic() {
        dotenvy::from_filename("./Secrets.toml").unwrap();
        let mnemonic = std::env::var("MNEMONIC").unwrap();
        let derivation_path = DEFAULT_DERIVATION_PATH.to_string();
        let result = wallet_from_mnemonic(mnemonic, derivation_path);
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_provider() {
        let rpc_url = "http://localhost:8545".to_string();
        let result = get_provider(rpc_url);
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_send_claim_transaction() {
        dotenvy::from_filename("./Secrets.toml").unwrap();
        // let mnemonic = std::env::var("MNEMONIC").unwrap();

        let private_key_hex = std::env::var("PRIVATE_KEY_HEX").unwrap();

        let rpc_url = std::env::var("RPC_URL").unwrap();
        let address = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1".to_string();
        let contract_address =
            "0xc1a0a99B9783Eb5c1cc760F80a45ec29B70d0A68".to_string();
        // let result = send_claim_transaction(
        //     address,
        //     contract_address,
        //     PrivateKeyTypes::Mnemonic(mnemonic),
        //     rpc_url,
        // )
        // .await;

        let result = send_claim_transaction(
            address,
            contract_address,
            PrivateKeyTypes::PrivateKeyHex(private_key_hex),
            rpc_url,
        )
        .await;

        match result.clone() {
            Ok(_) => {}
            Err(e) => {
                println!("Error: {}", e);
            }
        }

        assert!(result.is_ok());
    }
}
