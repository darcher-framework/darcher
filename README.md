# ĐArcher Framework

A testing framework to detecting on-chain-off-chain synchronization bugs in decentralized applications (DApp). 

This repo contains the source code and experiment results for FSE2021 submission #98.

## Prerequisites
- OS: `Ubuntu Desktop 20.04`
- Node.js: `^10.23.0`
- Yarn: `^1.22.10`
- Java SDK: `^1.8.0_271`
- Maven: `^3.6.3`
- Docker

## Install
Clone this project and go into the project directory:
```bash
git clone --recurse-submodules https://github.com/darcher-framework/darcher.git && cd darcher 
```
**Note that recursive submodules should be cloned as well.**

Install dependencies and build TypeScript.
```
yarn
yarn build
```

## Experiment Results

### Subjects
- [AgroChain](https://github.com/Kerala-Blockchain-Academy/AgroChain)
- [Augur](https://augur.net/)
- [DemocracyEarth](https://github.com/DemocracyEarth)
- [ETH-Hot-Wallet](https://github.com/PaulLaux/eth-hot-wallet)
- [Ethereum-Voting-Dapp](https://github.com/maheshmurthy/ethereum_voting_dapp)
- [Giveth](https://giveth.io/)
- [Heiswap](https://github.com/kendricktan/heiswap-dapp)
- [MetaMask](https://metamask.io/)
- [Multisender](https://github.com/rstormsf/multisender)
- [PublicVotes](https://github.com/domschiener/publicvotes)
- [TodoList-Dapp](https://github.com/mbeaudru/ethereum-todolist)

### Transactions during Testing

The transactions initiated and processed during the experiments is 
in folder [`experiment-results`](./experiment-results), where each
transaction is stored with `off-chain states` at each lifecycle state.

### Transaction Analysis with ĐArcher Oracles

Run the follow command in terminal to analysis the transactions of a subject.
```bash
yarn analysis:<subject>
```
`<subject>` should be substituted with one of the subject names as given above. 
The report (a `.report.json` file) shall be generated at the current directory.

The report groups transactions with the stack trace where they are initiated in DApps,
and mark them as buggy if they violate oracles in ĐArcher or baselines.

## Use ĐArcher to Test DApps

**This section is to be UPDATED**

### Steps

#### Browser Environment Setup

1. Make sure you have `Google Chrome` installed.
2. Download a profile of Chrome from our OneDrive, [here](https://1drv.ms/u/s!AjHWCQpYx4Nea03Fy5V5iRgjWIk?e=AC1Zej).
3. Extract the downloaded `ChromeProfile.tar` at `./ChromeProfile` folder, which we will use as profile directory to start Chrome.

#### Ethereum Environment Setup

1. Download Ethereum `DAG` data from our OneDrive, [here](https://1drv.ms/u/s!AjHWCQpYx4NebAwkIvUgL-4HmLg?e=Al3ffi).
2. Extract the downloaded `ethash.tar` at `~/.ethash` folder, which will be used in the controlled blockchain or ĐArcher.

#### Get Familiar with Crawljax

ĐArcher integrates `Crawljax` as DApp Front-End Explorer. 
You may need to check the `Crawljax` project, [here](https://github.com/crawljax/crawljax), and get familiar with the usage of `Crawljax`.
1. Put your main class for `Crawljax` under `./packages/darcher-crawljax/examples/src/main/java/com/darcher/crawljax/experiments`.
You can find main class for experiment subjects there.
2. Make sure you use `com.darchercrawljax.grpc.GRPCClientPlugin` in `Crawljax`, which is a plugin we build to integrate Crawljax with ĐArcher.

#### Write & Run your ĐArcher Configuration Script

You can find scripts for experiment subjects in `./packages/darcher-examples/<subject>/scripts/start-experiment.ts` folder.
You can take them as examples.
Typically, you only need to define a JavaScript object, specifying various configurations, and call the function we provide to start testing.

#### Result Analysis

Transactions during the test will be stored in `results` directory under the parent folder of your script. 
Off-chain states are stored along with transactions. 
The oracle checking is done after the experiment, based on the data we collected in `results` directory. 

You can find analysis scripts for experiment subjects in `./scripts`.
You can take them as examples to write your own analysis script. 

### Experiment Reproduction

1. Complete the **Browser Environment Setup** and **Ethereum Environment Setup** as described above. 
2. Run the following command to start experiment of each subject:
```bash
yarn workspace @darcher/examples experiment:<subject>
```
`<subject>` should be substituted with one of the subject names as given above.

The experiment will take 1 hour, and the results will be generated at `./packages/darcher-examples/<subject>/results` directory.
3. Make sure to cleanup the services used in the experiment using the following command:
```bash
yarn workspace @darcher/examples cleanup:<subject>
```
4. Continue the **Result Analysis** as described above.
