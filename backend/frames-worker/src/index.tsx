import { Button, Frog } from 'frog';

export const app = new Frog();

import { ethers } from 'ethers';
import ContractABI from './RedEnvelope.json';


const image1 = "https://i.imgur.com/QoLXbDE.png";
const image2 = "https://i.imgur.com/dbxFCpQ.png";
const image3 = "https://i.imgur.com/dKvY6ME.png";
const image4 = "https://i.imgur.com/xbMs1Ns.png";


const provider = new ethers.JsonRpcProvider('https://testnet.inco.org');
const ensProvider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');


async function getMaxGifts(contractAddress): Promise<number> {
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
    const maxGifts = await contract.maxGifts();
    return maxGifts.toNumber();
}

async function getClaimedAmount(contractAddress, userAddress: string): Promise<number> {
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
    const claimedAmount = await contract.getClaimedAmount(userAddress);
    return claimedAmount.toNumber();
}

async function getClaimedGifts(contractAddress): Promise<number> {
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
    const claimedGifts = await contract.claimedGifts();
    return claimedGifts.toNumber();
}

async function canUserClaim(contractAddress: string, userAddress: string): Promise<boolean> {
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
    const canClaim = await contract.canClaim(userAddress);
    return canClaim;
}

async function getCreatorENSOrAddress(contractAddress): Promise<string> {
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
    const creatorAddress = await contract.creator();

    // Attempt to resolve the ENS name for the creator address. If found, return the ENS name.
    let ensName = await ensProvider.lookupAddress(creatorAddress);
    // enforce max length of ENS name
    if (ensName) {
        ensName = ensName.substring(0, 20);
    }
    return ensName || creatorAddress;
}


function getUserRanking(envelopeId: string, fid: string): number {
    console.log("executing getUserRanking: envelopId", envelopeId);
    console.log("executing getUserRanking: fid", fid);
    return 5;
}

// Frame 1: Display Sender's Address and "Open" Button
app.frame('/open/:envelopeId', (c) => {
    const { envelopeId } = c.req.param();
    const senderAddress = getCreatorENSOrAddress(envelopeId);
    return c.res({
        action: `/check/${envelopeId}`,
        image: (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image1} alt="Reward" style={{ justifyContent: 'center', alignItems: 'center', mobjectFit: "contain", axWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: 35, textAlign: 'center', display: 'flex' }}>
                    {senderAddress} has sent you a red envelope!
                </div>
            </div>
        ),
        intents: [
            <Button value="open">Open</Button>,
        ]
    });
});

// Frame 2: Determine Entitlement and Show Relevant Image and Button
app.frame('/check/:envelopeId', (c) => {
    const { envelopeId } = c.req.param();
    const { fid } = c.frameData.walletAddress;
    console.log("walletAddress", c.frameData.walletAddress);
    const isEntitled = canUserClaim(envelopeId, fid);


    let imageJSX;
    let action;
    let buttons = [];
    if (isEntitled) {
        const maxClaimedGifts = getMaxGifts(envelopeId);
        const claimedGifts = getClaimedGifts(envelopeId);
        const claimedText = `Congrats! There are ${claimedGifts}/${maxClaimedGifts} left to open.`;
        imageJSX = (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image2} alt="Success" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: 35, textAlign: 'center', display: 'flex' }}>
                    {claimedText}
                </div>
            </div>
        );
        action = `/lucky/${envelopeId}`;
        buttons = [
            <Button value="lucky">I'm feeling lucky</Button>,
        ]
    } else {
        imageJSX = (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image3} alt="Try again" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: 35, textAlign: 'center', display: 'flex' }}>
                    Sorry! This red envelope is not for you or you've already opened it!
                </div>
            </div>
        );
        buttons = [];
    }

    return c.res({
        action,
        image: imageJSX,
        intents: buttons,
    });
});

// Frame 3: Display Amount Received and User's Ranking
app.frame('/lucky/:envelopeId', (c) => {
    const { envelopeId } = c.req.param();
    const { fid } = c.frameData.walletAddress;
    console.log("walletAddress", c.frameData.walletAddress);
    const amountReceived = getClaimedAmount(envelopeId, fid);
    const userRanking = getUserRanking(envelopeId, fid);
    const maxClaimedGifts = getMaxGifts(envelopeId);

    return c.res({
        image: (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image4} alt="Reward" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: 35, textAlign: 'center', display: 'flex' }}>
                    You've claimed {amountReceived} USDC. Out of {maxClaimedGifts} your ranking is {userRanking}
                </div>
            </div>
        ),
        intents: [
            <Button value="compare">Compare with my friends</Button>,
        ]
    });
});

export default app