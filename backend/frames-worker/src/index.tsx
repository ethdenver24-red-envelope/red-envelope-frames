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

async function claimRedEnvelope(contractAddress, userAddress) {
    const endpoint = 'https://redenvelopeframes.shuttleapp.rs/claim';
    const data = {
        contract_address: contractAddress,
        user_address: userAddress,
    };

    try {
        const response = await axios.post(endpoint, data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making the claim:', error.response ? error.response.data : error.message);
        throw error;
    }
    return true;
}

async function getMaxGifts(contractAddress) {
    const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
    const maxGifts = await contract.maxGifts();
    return maxGifts.toNumber();
    return 10;
}

async function getClaimedAmount(contractAddress, userAddress) {
    const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
    const claimedAmount = await contract.getClaimedAmount(userAddress);
    return claimedAmount.toNumber();
    return 135;
}

async function getClaimedGifts(contractAddress) {
    const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
    const claimedGifts = await contract.claimedGifts();
    return claimedGifts.toNumber();
    return 9;
}

async function canUserClaim(contractAddress, userAddress) {
    const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
    const canClaim = await contract.canClaim(userAddress);
    return canClaim;
    return true;
}

async function getCreatorENSOrAddress(contractAddress) {
    console.log(1)
    const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider);
    console.log(2)
    let creatorAddress = await contract.creator();
    console.log(3)
    let ensName;
    try {
        ensName = await ensProvider.lookupAddress(creatorAddress);
    } catch (error) {
        console.log(error)
        ensName = creatorAddress;
    }
    console.log(4);
    if (ensName) {
        ensName = ensName.substring(0, 20);
    }
    creatorAddress = creatorAddress.substring(0, 20);
    return ensName || creatorAddress;
    return "webthe3rd.eth";
}

function getUserRanking(envelopeId, fid) {
    console.log("executing getUserRanking: envelopId", envelopeId);
    console.log("executing getUserRanking: fid", fid);
    return 9;
}

app.frame('/open/:envelopeId', async (c) => {
    const { envelopeId } = c.req.param();
    console.log("executing open frame: envelopeId", envelopeId);
    const senderAddress = await getCreatorENSOrAddress(envelopeId);
    console.log("got sender address senderAddress", senderAddress);
    return c.res({
        action: `/check/${envelopeId}`,
        image: (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image1} alt="Reward" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: '35px', textAlign: 'center', fontFamily: 'Roboto', display: 'flex' }}>
                    {senderAddress} has sent you a red envelope!
                </div>
            </div>
        ),
        intents: [
            <Button value="open">Open</Button>,
        ]
    });
});

app.frame('/check/:envelopeId', async (c) => {
    const { envelopeId } = c.req.param();
    const { fid } = c.frameData.walletAddress;
    const isEntitled = await canUserClaim(envelopeId, fid);

    let imageJSX;
    let action;
    let buttons = [];
    if (isEntitled) {
        const claimedText = `Congrats! There are ${await getClaimedGifts(envelopeId)}/${await getMaxGifts(envelopeId)} left to open.`;
        imageJSX = (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image2} alt="Success" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: '35px', textAlign: 'center', fontFamily: 'Roboto', display: 'flex' }}>
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
                <div style={{ color: 'red', fontSize: '35px', textAlign: 'center', fontFamily: 'Roboto', display: 'flex' }}>
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

app.frame('/lucky/:envelopeId', async (c) => {
    const { envelopeId } = c.req.param();
    const { fid } = c.frameData.walletAddress;
    await claimRedEnvelope(envelopeId, fid)
    const amountReceived = await getClaimedAmount(envelopeId, fid);
    const userRanking = await getUserRanking(envelopeId, fid);
    const maxClaimedGifts = await getMaxGifts(envelopeId);

    return c.res({
        image: (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image4} alt="Reward" style={{ justifyContent: 'center', alignItems: 'center', objectFit: "contain", maxWidth: '50%', maxHeight: '50%' }} />
                <div style={{ color: 'red', fontSize: '35px', textAlign: 'center', fontFamily: 'Roboto', display: 'flex' }}>
                    You've claimed {amountReceived} USDC.
                </div>
            </div>
        ),
        intents: [
            <Button value="compare">Compare with my friends</Button>,
        ]
    });
});

export default app;