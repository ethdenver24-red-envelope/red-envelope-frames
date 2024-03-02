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

  const deployedEnvelope = await deploy("RedEnvelope", {
    from: deployer,
    args: [deployer, deployedERC20.address, 10],
    log: true,
  });

  console.log(`RedEnvelope contract: `, deployedEnvelope.address);

  const envelopeInstances = await createInstances(deployedEnvelope.address, hre.ethers, await getSigners(hre.ethers));
  let encryptedAmount = envelopeInstances.alice.encrypt32(1000);

  const redEnvelope = await hre.ethers.getContractAt("RedEnvelope", deployedEnvelope.address);
  console.log("Calling setAmounts(bytes) on RedEnvelope ...");
  const amountsTx = await createTransaction(redEnvelope["setAmounts(bytes)"], encryptedAmount);
  await amountsTx.wait();

  console.log("Calling mint(bytes) ...");
  const erc20 = await hre.ethers.getContractAt("EncryptedERC20", deployedERC20.address);
  encryptedAmount = erc20Instances.alice.encrypt32(10000);
  const mintTx = await createTransaction(erc20.mint, encryptedAmount);
  await mintTx.wait();

  console.log("Calling transfer(address,bytes) ...");
  encryptedAmount = erc20Instances.alice.encrypt32(1000);
  const transferTx = await createTransaction(
    erc20["transfer(address,bytes)"],
    deployedEnvelope.address,
    encryptedAmount,
  );
  await transferTx.wait();
};
export default func;
func.id = "deploy_encryptedERC20"; // id required to prevent reexecution
func.tags = ["EncryptedERC20", "RedEnvelopeFactory"];
