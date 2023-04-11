<div align="center">
  <h1>Substrate Smart Contracts Caller</h1>
   <strong>Ver. 0.4.9</strong>
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

**EXAMPLE QUERY**

```
http://localhost:3000/api/contract/read/?methodName=getUserActivityScore&args[]=pawel
```

-  GET `api/contract/txUrl` - Previously executed transaction's block url

**EXAMPLE QUERY**

```
http://localhost:3000/api/contract/txUrl/?tx=421d940c-fe60-4706-957d-dcc62fa856be
```

**RESPONSE BODY**

```
{
    "transactionBlockUrl": "https://test.azero.dev/?rpc=wss%3A%2F%2Fws.test.azero.dev#/explorer/query/<block_hash>"
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

-  GET `api/contract/codeHash` - Previously executed transaction's block url

**EXAMPLE QUERY**

```
http://localhost:3000/api/contract/codeHash/?contract=5Egajaq39MT1Q3Y17bh5fbrQXUBgckZahq87JmfW9dJ7KYpV
```

**RESPONSE BODY**

```
{
    "codeHash": "<code_hash>"
}
```

#### Accounts

-  GET `api/account/publicKey` - Account's Public Key

**RESPONSE BODY**

```
{
    "accountPublicKey": "public_key"
}
```

#### Signatures

-  GET `api/signature/verify` - Verification of the given signature

**EXAMPLE QUERY**

```
http://localhost:3000/api/signature/verify/?message=secretmessage&signature=356765865443643643634&publicAddress=46565475474374734
```

**RESPONSE BODY**

```
{
    "isSignatureValid": boolean
}
```

## License

* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)