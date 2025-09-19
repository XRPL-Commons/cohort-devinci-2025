import chalk from "chalk";
import { Client, convertStringToHex, Payment, xrpToDrops } from "xrpl";

export async function payment() {
    const client = new Client("wss://s.altnet.rippletest.net:51233/");

    await client.connect();

    const { wallet: wallet1, balance: balance1 } = await client.fundWallet();
    console.log(chalk.blue("Wallet 1 address: ", wallet1.address));
    console.log(chalk.yellow("Wallet 1 balance: ", balance1, "xrp"));

    const { wallet: wallet2, balance: balance2 } = await client.fundWallet();
    console.log(chalk.blue("Wallet 2 address: ", wallet2.address));
    console.log(chalk.yellow("Wallet 2 balance: ", balance2, "xrp"));

    const paymentTx: Payment = {
        TransactionType: "Payment",
        Account: wallet1.address,
        Destination: wallet2.address,
        Amount: xrpToDrops("1"),
        Memos: [
            {
                Memo: {
                    MemoType: convertStringToHex("Message"),
                    MemoData: convertStringToHex("Hello, Kryptosphere DeVinci!"),
                },
            },
        ],
    }

    const paymentTxResult = await client.submitAndWait(paymentTx, { autofill: true, wallet: wallet1 });

    if (paymentTxResult.result.validated) {
        console.log(chalk.green("Payment succeeded ✅ - Hash: ", paymentTxResult.result.hash));
    } else {
        console.log(chalk.red("Payment failed ❌ - Result:", paymentTxResult.result.meta));
    }

    await client.disconnect();
}
