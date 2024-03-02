import { expect } from "chai";
import { ethers } from "hardhat";

import { deployEncryptedERC20Fixture } from "../encryptedERC20/EncryptedERC20.fixture";
import { createInstances } from "../instance";
import { getSigners } from "../signers";
import { createTransaction } from "../utils";
import { deployRedEnvelopeFactoryFixture } from "./RedEnvelopeFactory.fixture";

describe("RedEnvelope", function () {
  before(async function () {
    this.signers = await getSigners(ethers);
  });

  beforeEach(async function () {
    const factoryContract = await deployRedEnvelopeFactoryFixture();
    const erc20Contract = await deployEncryptedERC20Fixture();
    this.factoryAddress = await factoryContract.getAddress();
    this.erc20Address = await erc20Contract.getAddress();
    this.factory = factoryContract;
    this.erc20 = erc20Contract;
    this.factoryInstances = await createInstances(this.factoryAddress, ethers, this.signers);
    this.erc20Instances = await createInstances(this.erc20Address, ethers, this.signers);
  });

  it("should create a red envelope contract via the factory, ", async function () {
    const encryptedAmount = this.erc20Instances.alice.encrypt32(10000);
    const transaction = await createTransaction(this.erc20.mint, encryptedAmount);
    await transaction.wait();

    const encryptedTotalAmount = this.erc20Instances.alice.encrypt32(1337);
    const approveTx = await createTransaction(
      this.erc20["approve(address,bytes)"],
      this.factoryAddress,
      encryptedTotalAmount,
    );
    await approveTx.wait();

    const encryptedAmountEnvelope = this.erc20Instances.alice.encrypt32(1337);

    const createTx = await createTransaction(
      this.factory["create(address,uint256,bytes)"],
      this.erc20Address,
      10,
      encryptedAmountEnvelope,
    );
    await createTx.wait();

    const tokenAlice = this.erc20Instances.alice.getTokenSignature(this.erc20Address)!;

    const encryptedBalanceAlice = await this.erc20.balanceOf(tokenAlice.publicKey, tokenAlice.signature);

    // Decrypt the balance
    const balanceAlice = this.erc20Instances.alice.decrypt(this.erc20Address, encryptedBalanceAlice);

    expect(balanceAlice).to.equal(10000 - 1337);

    const factoryAlice = this.factoryInstances.alice.getTokenSignature(this.factoryAddress)!;

    const numEnvelopes = await this.factory.numEnvelopes();

    expect(numEnvelopes).to.equal(1);
  });
});
