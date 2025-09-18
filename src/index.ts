import { payment } from "./payment";
import { token } from "./token";
import { amm } from "./amm";

async function main() {
    await payment();
    // await token();
    // await amm();
}

main();