import { Button, Frog } from 'frog';

export const app = new Frog();

const image1 = "https://i.imgur.com/QoLXbDE.png";
const image2 = "https://i.imgur.com/dbxFCpQ.png";
const image3 = "https://i.imgur.com/dKvY6ME.png";
const image4 = "https://i.imgur.com/xbMs1Ns.png";

function getSenderOfEnvelope(envelopeId: string): string {
    //return ens
    return "Vitalik.eth";
}

function canClaim(envelopeId: string, fid: string): boolean {
    console.log("executing canClaim: envelopId", envelopeId);
    console.log("executing canClaim: fid", fid);
    return true;
}

function getAmountReceived(envelopeId: string, fid: string): number {
    console.log("executing getAmountReceived: envelopId", envelopeId);
    console.log("executing getAmountReceived: fid", fid);
    return 100;
}

function getClaimedGifts(envelopeId: string): number {
    console.log("executing getClaimedGifts: envelopId", envelopeId);
    return 5;
}

function getMaxGifts(envelopeId: string): number {
    console.log("executing getClaimedGifts: envelopId", envelopeId);
    return 100;
}


function getUserRanking(envelopeId: string, fid: string): number {
    console.log("executing getUserRanking: envelopId", envelopeId);
    console.log("executing getUserRanking: fid", fid);
    return 1;
}

// Frame 1: Display Sender's Address and "Open" Button
app.frame('/open/:envelopeId', (c) => {
    const { envelopeId } = c.req.param();
    const senderAddress = getSenderOfEnvelope(envelopeId);
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
    const isEntitled = canClaim(envelopeId, fid);

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
    const amountReceived = getAmountReceived(envelopeId, fid);
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