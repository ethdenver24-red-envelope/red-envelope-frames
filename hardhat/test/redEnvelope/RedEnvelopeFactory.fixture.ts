import { ethers } from "hardhat";

import type { RedEnvelopeFactory } from "../../types";
import { getSigners } from "../signers";

export async function deployRedEnvelopeFactoryFixture(): Promise<RedEnvelopeFactory> {
  const signers = await getSigners(ethers);

  const contractFactory = await ethers.getContractFactory("RedEnvelopeFactory");
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  return contract;
}
