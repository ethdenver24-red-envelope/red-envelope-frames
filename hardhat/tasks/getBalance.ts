import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { createInstances } from "../test/instance";
import { Signers, getSigners } from "../test/signers";
import { FhevmInstances } from "../test/types";

task("task:getBalance")
  .addParam("account", "Specify which account [alice, bob, carol, dave]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;
    const EncryptedERC20 = await deployments.get("EncryptedERC20");
    const signers = await getSigners(ethers);

    const instances = await createInstances(EncryptedERC20.address, ethers, signers);

    const encryptedERC20 = await ethers.getContractAt("EncryptedERC20", EncryptedERC20.address);

    const tokenAccount = instances[taskArguments.account as keyof FhevmInstances].getTokenSignature(
      EncryptedERC20.address,
    )!;
    const balanceEncrypted = await encryptedERC20
      .connect(signers[taskArguments.account as keyof Signers])
      .balanceOf(tokenAccount.publicKey, tokenAccount.signature);

    const balance = instances[taskArguments.account as keyof FhevmInstances].decrypt(
      EncryptedERC20.address,
      balanceEncrypted,
    );

    console.log("Balance of %s: %s", taskArguments.account, balance);
  });
