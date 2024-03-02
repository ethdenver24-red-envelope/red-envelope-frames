import { BrowserProvider, AbiCoder, Contract, Interface } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";

import EncryptedERC20Abi from "../abis/EncryptedERC20.json";

export const init = async () => {
  await initFhevm();
};

// TFHE.sol contract address
// From https://github.com/zama-ai/fhevmjs/blob/c4b8a80a8783ef965973283362221e365a193b76/bin/fhevm.js#L9
const FHE_LIB_ADDRESS = "0x000000000000000000000000000000000000005d";

export const provider = new BrowserProvider(window.ethereum);

let instance;

export const createFhevmInstance = async () => {
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  // Get blockchain public key
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  console.log({ chainId, publicKey });
  instance = await createInstance({ chainId, publicKey });
};

export const getInstance = async () => {
  await init();
  await createFhevmInstance();
  return instance;
};

const getReencryptPublicKey = async (contractAddress, userAddress) => {
  if (!instance.hasKeypair(contractAddress)) {
    const eip712Domain = {
      // Give a user-friendly name to the specific contract you're signing for.
      // This must match the EIP712WithModifier string in the contract constructor.
      name: "Authorization token",
      // This identifies the latest version.
      // This must match the EIP712WithModifier version in the contract constructor.
      version: "1",
      // This defines the network, in this case, Gentry Testnet.
      chainId: 9090,
      // Add a verifying contract to make sure you're establishing contracts with the proper entity.
      verifyingContract: contractAddress,
    };

    const reencryption = instance.generatePublicKey(eip712Domain);

    const params = [userAddress, JSON.stringify(reencryption.eip712)];
    const sig = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params,
    });

    instance.setSignature(contractAddress, sig);
  }

  return instance.getPublicKey(contractAddress);
};

export const getEncryptedBalance = async (
  tokenAddress,
  signer,
  userAddress
) => {
  // Initialize contract with ethers
  const contract = new Contract(tokenAddress, EncryptedERC20Abi, signer);

  const reencrypt = await getReencryptPublicKey(tokenAddress, userAddress);
  console.log(reencrypt);
  const encryptedBalance = await contract.balanceOf(
    reencrypt.publicKey,
    reencrypt.signature
  );

  console.log("fetched");
  // Decrypt the balance
  console.log(tokenAddress, encryptedBalance);
  const balance = instance.decrypt(tokenAddress, encryptedBalance);
  console.log(balance);
  return balance;
};
