import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { init, getInstance } from "./utils/fhevm";
import { toHexString } from "./utils/utils";
import { Connect } from "./Connect";

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

function Example({ account, provider }) {
  const [tokenAddress, setTokenAddress] = useState("");
  const [numRecipients, setNumRecipients] = useState("");
  const [amountUint32, setAmountUint32] = useState("");
  const [eamountUint32, setEamountUint32] = useState("");

  const [factoryContract, tokenContract] = useMemo(
    () => [
      new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        ["create(address,uint256,bytes)"],
        provider
      ),
      new ethers.Contract(tokenAddress, ["balanceOf(address,bytes)"], provider),
    ],
    [provider, tokenAddress]
  );

  const handleTokenChange = (event) => {
    setTokenAddress(event.target.value);
  };

  const handleNumRecipientsChange = (event) => {
    setNumRecipients(event.target.value);
  };

  const handleAmountChangeUint32 = (event) => {
    let _instance = getInstance();
    _instance.then((instance) => {
      setEamountUint32(toHexString(instance.encrypt32(+event.target.value)));
    });
    setAmountUint32(event.target.value);
  };

  const handleCreate = () => {
    const contract = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      ["create(address,uint256,bytes)"],
      provider
    );
    contract.create(tokenAddress, numRecipients, eamountUint32).then((tx) => {
      console.log(tx);
    });
  };

  const getBalance = useCallback(async () => {
    if (!tokenAddress) return;
    const signature = await signer.signTypedData(
      generatedToken.eip712.domain,
      { Reencrypt: generatedToken.eip712.types.Reencrypt }, // Need to remove EIP712Domain from types
      generatedToken.eip712.message
    );
    const balance = await tokenContract.balanceOf(account, "0x");
  }, [tokenContract, account, signer]);

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
          <Form.Label className="label">Amount: </Form.Label>
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
      <Button
        variant="default"
        onClick={handleCreate}
        disabled={!tokenAddress || !numRecipients || !amountUint32}
      >
        Create
      </Button>
    </div>
  );
}

export default App;
