import {Logger} from "@darcher/helpers";
import clearIndexedDB from "./clear-indexedDB";
import * as path from "path";
import {baseConfig, ExperimentConfig, startExperiment} from "../../scripts/experiment";
import * as _ from "lodash";
import {DBOptions} from "@darcher/config/dist";
import {WebDriver} from "selenium-webdriver";


if (require.main === module) {
    (async () => {
        const subjectDir = path.join(__dirname, "..");
        const augurConfig: ExperimentConfig = Object.assign(_.cloneDeep(baseConfig), {
            dappName: "Augur",
            dappUrl: "http://localhost:8080",
            crawljaxClassName: "AugurExperiment",
            resultDir: path.join(subjectDir, "results"),
            composeFile: path.join(subjectDir, "docker-compose.yml"),

            analyzerConfig: {
                grpcPort: 1234,
                wsPort: 1235,
                traceStorePort: 1236,
                txStateChangeProcessTime: 15000,
            },
            dbMonitorConfig: {
                db: DBOptions.indexedDB,
                dbName: "augur-123456",
                dbAddress: "localhost:8080",
            },

            metamaskNetwork: "Localhost 8545",
            metamaskAccount: "Augur0",

            beforeStartCrawljaxHook: async (logger: Logger, webDriver: WebDriver) =>{
                await clearIndexedDB(logger, webDriver, "http://" + augurConfig.dbMonitorConfig.dbAddress, [augurConfig.dbMonitorConfig.dbName, "0x-mesh/mesh_dexie_db"]);
            }
        });
        await startExperiment(augurConfig);
    })().catch(e => console.error(e));
}
