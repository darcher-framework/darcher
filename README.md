# ĐArcher Framework

A testing framework to detecting on-chain-off-chain synchronization bugs in decentralized applications (DApp). 

**This README is to be UPDATED**
This repo contains the source code and experiment results for FSE2021 submission #98.

## Prerequisites

- Node.js: `^10.23.0`
- Yarn: `^1.22.10`
- Docker

## Install
Clone this project and go into the project directory:
```bash
git clone https://github.com/ĐArcher-framework/ĐArcher.git && cd ĐArcher 
```

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
