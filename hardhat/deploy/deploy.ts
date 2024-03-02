import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { createInstances } from "../test/instance";
import { getSigners } from "../test/signers";
import { createTransaction } from "../test/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedERC20 = await deploy("EncryptedERC20", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`EncryptedERC20 contract: `, deployedERC20.address);

  const deployedFactory = await deploy("RedEnvelopeFactory", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`RedEnvelopeFactory contract: `, deployedFactory.address);

  const erc20Instances = await createInstances(deployedERC20.address, hre.ethers, await getSigners(hre.ethers));
  const factoryInstances = await createInstances(deployedFactory.address, hre.ethers, await getSigners(hre.ethers));

  // const deployedEnvelope = await deploy("RedEnvelope", {
  //   from: deployer,
  //   args: [deployer, deployedERC20.address, 10],
  //   log: true,
  // });

  // console.log(`RedEnvelope contract: `, deployedEnvelope.address);

  // const envelopeInstances = await createInstances(deployedEnvelope.address, hre.ethers, await getSigners(hre.ethers));
  // let encryptedAmount = envelopeInstances.alice.encrypt32(1000e6);

  // const redEnvelope = await hre.ethers.getContractAt("RedEnvelope", deployedEnvelope.address);
  // console.log("Calling setAmounts(bytes) on RedEnvelope ...");
  // const amountsTx = await createTransaction(redEnvelope["setAmounts(bytes)"], encryptedAmount);
  // await amountsTx.wait();

  console.log("Calling mint(bytes) ...");
  const erc20 = await hre.ethers.getContractAt("EncryptedERC20", deployedERC20.address);
  const encryptedMintAmount = factoryInstances.alice.encrypt32(2000e6);
  const mintTx = await createTransaction(erc20.mint, encryptedMintAmount);
  await mintTx.wait();

  console.log("Calling transfer(address,bytes) ...");
  const transferTx = await createTransaction(
    erc20["transfer(address,bytes)"],
    "0x4E39DCdac1DCa1694897B5CB783Ab52683586962",
    encryptedMintAmount,
  );
  await transferTx.wait();

  console.log("Calling approve(address,bytes) ...");
  const encryptedApproveAmount = erc20Instances.alice.encrypt32(1000e6);
  const approveTx = await createTransaction(
    erc20["approve(address,bytes)"],
    deployedFactory.address,
    encryptedApproveAmount,
  );
  await approveTx.wait();

  const tokenAlice = erc20Instances.alice.getTokenSignature(deployedERC20.address)!;

  console.log(
    "allowance(%s, %s): %s",
    deployer,
    deployedFactory.address,
    erc20Instances.alice.decrypt(
      deployedERC20.address,
      await erc20.allowance(deployedFactory.address, tokenAlice.publicKey, tokenAlice.signature),
    ),
  );

  console.log("Calling create(address,uint256,bytes) ...");
  const encryptedAmount = erc20Instances.alice.encrypt32(10e6);
  const factory = await hre.ethers.getContractAt("RedEnvelopeFactory", deployedFactory.address);
  // await factory["create(address,uint256,bytes)"](deployedERC20.address, 10, encryptedAmount);
  const createTx = await createTransaction(
    factory["create(address,uint256,bytes)"],
    deployedERC20.address,
    10,
    encryptedAmount,
  );
  await createTx.wait();
  console.log("Done creating RedEnvelope contract ...");

  console.log("New RedEnvelope contract created by factory: ", await factory.envelopes(0));
};
export default func;
func.id = "deploy_encryptedERC20"; // id required to prevent reexecution
func.tags = ["EncryptedERC20", "RedEnvelopeFactory"];
