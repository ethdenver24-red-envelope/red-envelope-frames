import "./App.css";
import { ethers, Interface } from "ethers";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Button } from "react-bootstrap";

import { init, getInstance, getEncryptedBalance } from "./utils/fhevm";
import { toHexString } from "./utils/utils";
import { Connect } from "./Connect";
import RedEnvelopeFactoryAbi from "./abis/RedEnvelopeFactory.json";
import EncryptedERC20Abi from "./abis/EncryptedERC20.json";

const FACTORY = "0x7737b7c57827c7Aa99a254ba8bd0719013d1C860";
const TOKEN = "0xC9981c2179a7d52E15A64e4B82eA54bB693407fe";
const ENVELOPE = "0xc1a0a99B9783Eb5c1cc760F80a45ec29B70d0A68";
const FRAME_URL = "https://667c-37-19-210-5.ngrok-free.app/open/";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  return (
    <div className="App">
      <div className="menu">
        <Connect>
          {(account, provider, signer) => (
            <Example account={account} provider={provider} signer={signer} />
          )}
        </Connect>
      </div>
    </div>
  );
}

function Example({ account, provider, signer }) {
  const [tokenAddress, setTokenAddress] = useState(TOKEN);
  const [numRecipients, setNumRecipients] = useState("");
  const [amountUint32, setAmountUint32] = useState("");
  const [eamountUint32, setEamountUint32] = useState("");
  const [balance, setBalance] = useState("");
  const [displayUrl, setDisplayUrl] = useState();

  const [factoryContract, tokenContract] = useMemo(
    () => [
      new ethers.Contract(FACTORY, RedEnvelopeFactoryAbi, signer),
      new ethers.Contract(tokenAddress, EncryptedERC20Abi, signer),
    ],
    [signer, tokenAddress]
  );

  const handleTokenChange = (event) => {
    setTokenAddress(event.target.value);
  };

  const handleNumRecipientsChange = (event) => {
    setNumRecipients(event.target.value);
  };

  const handleAmountChangeUint32 = (event) => {
    setAmountUint32(event.target.value);
  };

  const handleCreate = useCallback(async () => {
    // // dev
    // setDisplayUrl(`${FRAME_URL}${ENVELOPE}`);
    // return;

    console.log("Creating red envelope");
    if (!tokenAddress || !numRecipients || !amountUint32 || !signer) return;
    // approve tokens
    console.log("Encrypting token amount");
    const instance = await getInstance();
    const encryptedApprovalAmount = instance.encrypt32(+amountUint32);
    const tx = await tokenContract.approve(
      tokenAddress,
      encryptedApprovalAmount
    );
    console.log(tx);
    await tx.wait();
    console.log("Tokens approved");
    // create red envelope
    console.log("Creating red envelope");
    console.log(tokenAddress, numRecipients, encryptedApprovalAmount);
    const tx2 = await factoryContract.create(
      tokenAddress,
      numRecipients,
      encryptedApprovalAmount
    );
    console.log(tx2);
    await tx2.wait();
    console.log("Red envelope created");
    // get return value from tx2
    const iface = new Interface(RedEnvelopeFactoryAbi);
    const event = iface.parseLog(tx2.logs[0]);
    const redEnvelopeAddress = event.args[0];
    console.log(redEnvelopeAddress);
  }, [tokenAddress, numRecipients, amountUint32, signer]);

  const handleResolveBalance = useCallback(async () => {
    if (!tokenAddress || !signer) return;
    console.log("Fetching balance");
    const balance = await getEncryptedBalance(tokenAddress, signer, account);
    console.log(balance);
  }, [tokenAddress, signer, account]);

  return (
    <div>
      <h1>
        Create a <span>Red Envelope</span>
      </h1>
      <Form className="Form-container">
        <Form.Group className="form-group">
          <Form.Label className="label">Token Address: </Form.Label>
          <Form.Control
            style={{ color: "white" }}
            type="text"
            value={tokenAddress}
            placeholder="0x1234...5678"
            onChange={handleTokenChange}
            className="Input"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="label">
            Amount: (<span onClick={handleResolveBalance}>max</span>)
          </Form.Label>
          <Form.Control
            style={{ color: "white" }}
            type="text"
            value={amountUint32}
            placeholder="10"
            onChange={handleAmountChangeUint32}
            className="Input"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="label">Number of Recipients: </Form.Label>
          <Form.Control
            style={{ color: "white" }}
            type="text"
            value={numRecipients}
            placeholder="10"
            onChange={handleNumRecipientsChange}
            className="Input"
          />
        </Form.Group>
      </Form>
      <br></br>
      {displayUrl ? (
        <>
          Frame link:
          <br />
          {displayUrl}
        </>
      ) : (
        <Button
          variant="default"
          onClick={handleCreate}
          disabled={!tokenAddress || !numRecipients || !amountUint32}
        >
          Create
        </Button>
      )}
    </div>
  );
}

export default App;
