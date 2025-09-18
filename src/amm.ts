import chalk from "chalk";
import { AccountSet, AccountSetAsfFlags, AMMCreate, Client, OfferCreate, OfferCreateFlags, TrustSet, TrustSetFlags, xrpToDrops } from "xrpl";

function convertStringToHexPadded(str: string): string {
    // Convert string to hexadecimal
    let hex: string = "";
    for (let i = 0; i < str.length; i++) {
        const hexChar: string = str.charCodeAt(i).toString(16);
        hex += hexChar;
    }

    // Pad with zeros to ensure it's 40 characters long
    const paddedHex: string = hex.padEnd(40, "0");
    return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
}

export async function amm() {
    const client = new Client("wss://s.altnet.rippletest.net:51233/");

    await client.connect();

    const { wallet: issuer } = await client.fundWallet();
    console.log(`Issuer: ${issuer.classicAddress}`);

    const { wallet: receiver } = await client.fundWallet();
    console.log(`Receiver: ${receiver.classicAddress}`);

    // ALLOW RIPPLING FOR ISSUER
    // console.log(chalk.bgWhite("-- ALLOW RIPPLING --"));
    const accountSetTx: AccountSet = {
        TransactionType: "AccountSet",
        Account: issuer.classicAddress,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple,
    }

    const result = await client.submitAndWait(accountSetTx, { autofill: true, wallet: issuer });

    // if (result.result.validated)
    //     console.log(`✅ AccountSet successful! Transaction hash: ${result.result.hash}`);
    // else
    //     console.log(`❌ AccountSet failed! Error: ${result.result.meta}`);

    // SETUP THE TRUSTLINE
    // console.log(chalk.bgWhite("-- CREATE TRUSTLINE --"));

    const tokenCode = convertStringToHexPadded("USDM");

    const trustSetTx: TrustSet = {
        TransactionType: "TrustSet",
        Account: receiver.address,
        LimitAmount: {
            currency: tokenCode,
            issuer: issuer.address,
            value: "500000000",
        },
        Flags: TrustSetFlags.tfClearNoRipple
    }

    const trustSetTxResult = await client.submitAndWait(trustSetTx, { autofill: true, wallet: receiver });

    // if (trustSetTxResult.result.validated)
    //     console.log(`✅ TrustSet successful! Transaction hash: ${trustSetTxResult.result.hash}`);
    // else
    //     console.log(`❌ TrustSet failed! Error: ${trustSetTxResult.result.meta}`);

    // CREATE A POOL FOR THE TOKEN
    // console.log(chalk.bgWhite("-- CREATE A POOL FOR USDM --"));
    // const createPoolTx: AMMCreate = {
    //     // TODO
    // }

    // const createPoolTxResult = await client.submitAndWait(createPoolTx, { autofill: true, wallet: issuer });

    // if (createPoolTxResult.result.validated)
    //     console.log(`✅ AMMCreate successful! Transaction hash: ${createPoolTxResult.result.hash}`);
    // else
    //     console.log(`❌ AMMCreate failed! Error: ${createPoolTxResult.result.meta}`);

    // // CREATE AN OFFER TO BUY THE TOKEN
    // console.log(chalk.bgWhite("-- CREATE AN OFFER TO BUY USDM --"));
    // const offerCreateTx: OfferCreate = {
    //     // TODO
    // }

    // const offerCreateTxResult = await client.submitAndWait(offerCreateTx, { autofill: true, wallet: receiver });

    // if (offerCreateTxResult.result.validated)
    //     console.log(`✅ OfferCreate successful! Transaction hash: ${offerCreateTxResult.result.hash}`);
    // else
    //     console.log(`❌ OfferCreate failed! Error: ${offerCreateTxResult.result.meta}`);

    await client.disconnect();
}
