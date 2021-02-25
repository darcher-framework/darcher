import {Browser, Command, loadConfig, Logger, MetaMask, sleep} from "@darcher/helpers";
import * as path from "path";
import * as fs from "fs";
import * as child_process from "child_process";
import {baseConfig, ExperimentConfig, startExperiment} from "../../scripts/experiment";
import * as _ from "lodash";
import {DBOptions} from "@darcher/config/dist";
import {WebDriver} from "selenium-webdriver";


function runAndLog(cmd: Command, cwd: string, logFile: string): child_process.ChildProcess {
    const logStream = fs.createWriteStream(logFile, {encoding: "utf-8"});
    const child = child_process.spawn(
        cmd.command, cmd.args, {
            stdio: ["inherit", "pipe", "pipe"],
            cwd: cwd,
        }
    )
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);
    return child;
}


if (require.main === module) {
    (async () => {
        const subjectDir = path.join(__dirname, "..");
        const givethConfig: ExperimentConfig = Object.assign(_.cloneDeep(baseConfig), {
            dappName: "giveth",
            dappUrl: "http://localhost:3010",
            crawljaxClassName: "GivethExperiment",
            resultDir: path.join(subjectDir, "results"),
            composeFile: path.join(subjectDir, "docker-compose.yml"),

            analyzerConfig: {
                grpcPort: 1234,
                wsPort: 1235,
                traceStorePort: 1236,
                txStateChangeProcessTime: 15000,
            },
            dbMonitorConfig: {
                db: DBOptions.mongoDB,
                dbName: "giveth",
                dbAddress: "mongodb://localhost:27017",
            },

            metamaskNetwork: "Localhost 8545",
            metamaskAccount: "Giveth0",

            beforeStartCrawljaxHook: async (logger: Logger, driver: WebDriver)=>{
                logger.info("Clearing MetaMask data...");
                await new MetaMask(logger, driver, givethConfig.metamaskUrl, givethConfig.metamaskPassword)
                    .changeNetwork("Localhost 8545")
                    .changeAccount("Giveth0")
                    .resetAccount()
                    .changeNetwork("Localhost 8546")
                    .resetAccount()
                    .changeAccount("Giveth0")
                    .resetAccount()
                    .do();
            },
        });
        await startExperiment(givethConfig);
    })().catch(e => console.error(e));
}
