import { Token } from "./form/token";
import { init_on_load } from "./utils/initializer";

Token.tokenGuard("login.html", true).then();

async function main() {

}

init_on_load(main);