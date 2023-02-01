import { Token } from "./form/token";
import { init_on_load } from "./utils/initializer";

await Token.tokenGuard("login.html", true);

async function main() {

}

init_on_load(main);