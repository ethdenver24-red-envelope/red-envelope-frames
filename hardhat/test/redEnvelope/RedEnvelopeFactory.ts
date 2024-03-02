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
    console.log("Bob: ", this.signers.bob.address);
    console.log("Carol: ", this.signers.carol.address);
    console.log("Dave: ", this.signers.dave.address);
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

  it.skip("should create a red envelope contract via the factory, ", async function () {
    const encryptedAmount = this.erc20Instances.alice.encrypt32(10000);
    const transaction = await createTransaction(this.erc20.mint, encryptedAmount);
    await transaction.wait();

    const encryptedAmountEnvelope = this.erc20Instances.alice.encrypt32(1337);

    const createTx = await createTransaction(
      this.factory["create(address,uint256,bytes)"],
      this.erc20Address,
      3,
      encryptedAmountEnvelope,
    );
    await createTx.wait();

    const envelopeAddress = await this.factory.envelopes(0);

    const encryptedTotalAmount = this.erc20Instances.alice.encrypt32(1337);
    const transferTx = await createTransaction(
      this.erc20["transfer(address,bytes)"],
      envelopeAddress,
      encryptedTotalAmount,
    );
    await transferTx.wait();

    const tokenAlice = this.erc20Instances.alice.getTokenSignature(this.erc20Address)!;

    const encryptedBalanceAlice = await this.erc20.balanceOf(tokenAlice.publicKey, tokenAlice.signature);

    // Decrypt the balance
    const balanceAlice = this.erc20Instances.alice.decrypt(this.erc20Address, encryptedBalanceAlice);

    expect(balanceAlice).to.equal(10000 - 1337);

    const numEnvelopes = await this.factory.numEnvelopes();

    expect(numEnvelopes).to.equal(1);
  });

  it("should create a red envelope and claim a gift for Bob", async function () {
    const encryptedAmount = this.erc20Instances.alice.encrypt32(10000);
    const transaction = await createTransaction(this.erc20.mint, encryptedAmount);
    await transaction.wait();

    const encryptedAmountEnvelope = this.erc20Instances.alice.encrypt32(1337);

    const createTx = await createTransaction(
      this.factory["create(address,uint256,bytes)"],
      this.erc20Address,
      3,
      encryptedAmountEnvelope,
    );
    await createTx.wait();

    const envelopeAddress = await this.factory.envelopes(0);

    const encryptedTotalAmount = this.erc20Instances.alice.encrypt32(1337);
    const transferTx = await createTransaction(
      this.erc20["transfer(address,bytes)"],
      envelopeAddress,
      encryptedTotalAmount,
    );
    await transferTx.wait();

    console.log("claiming...");
    const envelopeBob = await ethers.getContractAt("RedEnvelope", envelopeAddress, this.signers.bob);
    await envelopeBob.claim(this.signers.bob.address);
    console.log("claimed");

    const tokenBob = this.erc20Instances.bob.getTokenSignature(this.erc20Address)!;

    console.log("calling balanceOf...");
    const erc20Bob = await ethers.getContractAt("EncryptedERC20", this.erc20Address, this.signers.bob);
    const encryptedBalanceBob = await erc20Bob.balanceOf(tokenBob.publicKey, tokenBob.signature);

    console.log("calling getClaimedAmount...");
    const claimedAmount = await envelopeBob.getClaimedAmount(this.signers.bob.address);

    // Decrypt the balance
    const balanceBob = this.erc20Instances.bob.decrypt(this.erc20Address, encryptedBalanceBob);

    expect(balanceBob).to.equal(claimedAmount);
  });

  it("should not let Bob claim a gift twice", async function () {
    const encryptedAmount = this.erc20Instances.alice.encrypt32(10000);
    const transaction = await createTransaction(this.erc20.mint, encryptedAmount);
    await transaction.wait();

    const encryptedAmountEnvelope = this.erc20Instances.alice.encrypt32(1337);

    const createTx = await createTransaction(
      this.factory["create(address,uint256,bytes)"],
      this.erc20Address,
      3,
      encryptedAmountEnvelope,
    );
    await createTx.wait();

    const envelopeAddress = await this.factory.envelopes(0);

    const encryptedTotalAmount = this.erc20Instances.alice.encrypt32(1337);
    const transferTx = await createTransaction(
      this.erc20["transfer(address,bytes)"],
      envelopeAddress,
      encryptedTotalAmount,
    );
    await transferTx.wait();

    console.log("claiming...");
    const envelopeBob = await ethers.getContractAt("RedEnvelope", envelopeAddress, this.signers.bob);
    await envelopeBob.claim(this.signers.bob.address);
    console.log("claimed");

    expect(envelopeBob.claim(this.signers.bob.address)).to.be.revertedWithoutReason();
  });

  it("should not let Alice claim a gift after Bob, Carol and Dave", async function () {
    const encryptedAmount = this.erc20Instances.alice.encrypt32(10000);
    const transaction = await createTransaction(this.erc20.mint, encryptedAmount);
    await transaction.wait();

    const encryptedAmountEnvelope = this.erc20Instances.alice.encrypt32(1337);

    const createTx = await createTransaction(
      this.factory["create(address,uint256,bytes)"],
      this.erc20Address,
      3,
      encryptedAmountEnvelope,
    );
    await createTx.wait();

    const envelopeAddress = await this.factory.envelopes(0);

    const encryptedTotalAmount = this.erc20Instances.alice.encrypt32(1337);
    const transferTx = await createTransaction(
      this.erc20["transfer(address,bytes)"],
      envelopeAddress,
      encryptedTotalAmount,
    );
    await transferTx.wait();

    console.log("claiming for Bob...");
    const envelopeBob = await ethers.getContractAt("RedEnvelope", envelopeAddress, this.signers.bob);
    await envelopeBob.claim(this.signers.bob.address);
    console.log("claimed for Bob");

    console.log("claiming for Carol...");
    const envelopeCarol = await ethers.getContractAt("RedEnvelope", envelopeAddress, this.signers.carol);
    await envelopeCarol.claim(this.signers.carol.address);
    console.log("claimed for Carol");

    console.log("claiming for Dave...");
    const envelopeDave = await ethers.getContractAt("RedEnvelope", envelopeAddress, this.signers.dave);
    await envelopeDave.claim(this.signers.dave.address);
    console.log("claimed for Dave");

    console.log("trying to claim for Alice...");
    expect(envelopeBob.claim(this.signers.alice.address)).to.be.revertedWithoutReason();
  });
});
