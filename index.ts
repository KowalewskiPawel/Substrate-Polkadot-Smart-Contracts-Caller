import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { stringToU8a, u8aToHex, BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from "@polkadot/types/interfaces";
import dotenv from "dotenv";

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);

dotenv.config();

const wsProvider = new WsProvider("wss://ws.test.azero.dev");
const contractAddress = ""; // Enter your Smart Contract address here
// eslint-disable-next-line @typescript-eslint/no-var-requires
const contractMetadata = require("./metadata.json"); // import the given Smart Contract's metadata.json file

const keyring = new Keyring({ type: "ed25519" });

const phrase = process.env.PHRASE as string;

let api: ApiPromise | undefined;
let contract: ContractPromise | undefined;

const connectToProvider = async () => {
  api = new ApiPromise({ provider: wsProvider });
  await api.isReady;

  console.log(api.genesisHash.toHex());

  contract = new ContractPromise(api, contractMetadata, contractAddress);
};

connectToProvider();

const alice = keyring.addFromUri(phrase);

const message = stringToU8a("this is our message");
const signature = alice.sign(message);
const isValid = alice.verify(message, signature, alice.publicKey);

console.log(
  `The signature ${u8aToHex(signature)}, is ${isValid ? "" : "in"}valid`
);

const callContract = async () => {
  if (!contract) return;

  const storageDepositLimit = null;

  // Execute dry-run query call to fetch required gas value

  const { gasRequired } = await contract.query.flip(alice.address, {
    gasLimit: api?.registry.createType("WeightV2", {
      refTime: MAX_CALL_WEIGHT,
      proofSize: PROOFSIZE,
    }) as WeightV2,
    storageDepositLimit,
  });

  // Create gasLimit value

  const gasLimit = api?.registry.createType(
    "WeightV2",
    gasRequired
  ) as WeightV2;

  // actual smart contract transaction call

  await contract.tx
    .flip({
      gasLimit,
      storageDepositLimit,
    })
    .signAndSend(alice, async (res) => {
      if (res.status.isInBlock) {
        console.log("in a block");
      } else if (res.status.isFinalized) {
        console.log("finalized");
      }
    });

    // Read only query example

  const { result, output } = await contract.query.get(alice.address, {
    gasLimit: api?.registry.createType("WeightV2", {
      refTime: MAX_CALL_WEIGHT,
      proofSize: PROOFSIZE,
    }) as WeightV2,
    storageDepositLimit,
  });

  // The actual result from RPC as `ContractExecResult`
  console.log(result.toHuman());

  // check if the call was successful
  if (result.isOk) {
    // output the return value
    console.log("Success", output?.toHuman());
  } else {
    console.error("Error", result.asErr);
  }
};

setTimeout(() => {
  callContract();
}, 2000);
