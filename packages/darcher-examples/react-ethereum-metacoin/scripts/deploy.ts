import {Config} from "@darcher/config";
import {loadConfig} from "@darcher/helpers";
import * as path from "path";
import * as child_process from "child_process";
import {startCluster} from "./start-blockchain";

async function deploy(config: Config) {
    const cluster = await startCluster(config, true);

    child_process.spawnSync(
        path.join(__dirname, "..", "..", "node_modules", ".bin", "truffle"),
        ["migrate", "--reset"],{
            stdio: "inherit",
            cwd: path.join(__dirname, "..", "react-ethereum-metacoin")
        }
    );

    await cluster.stop();
}

if (require.main === module) {
    loadConfig(path.join(__dirname, "config", "react-ethereum-metacoin.config.ts")).then(async config => {
        await deploy(config);
    });
}
