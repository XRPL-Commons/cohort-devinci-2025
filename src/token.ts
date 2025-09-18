import chalk from "chalk";
import { Client, convertStringToHex, MPTokenIssuanceCreate, MPTokenIssuanceCreateFlags, MPTokenMetadata, OfferCreate } from "xrpl";
import { MPTokenIssuanceCreateMetadata } from "xrpl/dist/npm/models/transactions/MPTokenIssuanceCreate";

export async function token() {
//     const client = new Client("wss://s.devnet.rippletest.net:51233/");

//     await client.connect();

//     const { wallet } = await client.fundWallet();
//     console.log(`Issuer: ${wallet.classicAddress}`);

//     // CREATE THE TOKEN
//     console.log(chalk.bgBlue("-- CREATE THE TOKEN --"));

//     const metadata: MPTokenMetadata = {
//         // TODO
//     };

//     const createTokenTx: MPTokenIssuanceCreate = {
//         // TODO
//     };

//     const tokenCreateTxResult = await client.submitAndWait(createTokenTx, { wallet });
//     // @ts-ignore
//     const tokenId = tokenCreateTxResult.result.meta?.mpt_issuance_id;

//     if (tokenCreateTxResult.result.validated) {
//         console.log(chalk.green("Token issuance succeeded ✅"));
        
//         console.log(chalk.green(`Token issuance ID: ${tokenId}`));
//     } else {
//         console.log(chalk.red("Token issuance failed ❌ - Result:", tokenCreateTxResult.result.meta));
//     }

//     await client.disconnect();
}
