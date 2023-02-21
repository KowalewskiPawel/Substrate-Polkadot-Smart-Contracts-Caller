<div align="center">
  <h1>Substrate Smart Contracts Caller</h1>
   <strong>Ver. 0.2</strong>
</div>

## About

A backend tool for executing methods on Substrate based Smart Contracts, powered by Polkadot{.js}

## Installation

1. Clone the repo

2. Install all the dependencies - `yarn`

3. Create a .env file in the root folder with the following variables:

```
PHRASE=<Mnemonic_phrase_of_the_wallet_account>
WSPROVIDER=<RPC_connection_provider>
CONTRACT_ADDRESS=<deployed_smart_contract_address>
PORT=<Port_for_the_app_instance>
```
4. Add `metadata.json` file to the `./contractAPI` folder, with the ABI instructions of the given smart contract

5. Run the app with `yarn start` command

### Requirements

* Node v19.0.1
* yarn v1.22.19

### Built With

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [polkadot{.js}](https://polkadot.js.org/) - Library with JS tools for Substrate based Blockchains 

### Application Structure

- `index.ts` - The entry point to the application. This file defines the express server and connects it with routes
- `account/` - initiation of the account wallet used for smart contract calls
- `wsProviderAPI/` - RPC provider connection
- `contractAPI/` - the logic related to connecting with Smart Contract
- `utils/` - all of the smaller tools reused across the app
- `routes/` - routes definitions for the app
- `consts/` - Constant variables that are used in the app
- `controllers/` - controllers with all of the functions that can be executed in the app

### Routes

#### Smart Contract

-  GET `api/contract/read` - Execution of the read method on the given smart contract

**REQUEST BODY**

```
{
    "methodName": "name_of_the_method",
    "args": [] // array with the arguments list
}
```

-  POST `api/contract/write` - Execution of the write method on the given smart contract

**REQUEST BODY**

```
{
    "methodName": "name_of_the_method",
    "args": [] // array with the arguments list
}
```

#### Signatures

-  GET `api/signature/verify` - Verification of the given signature

**REQUEST BODY**

```
{
    "message": "singedMessage",
    "signature": "signatureHex",
    "publicAddress": "publicKey"
}
```

## License

* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)