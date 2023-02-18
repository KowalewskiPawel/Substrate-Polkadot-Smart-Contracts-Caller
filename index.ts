import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { stringToU8a, u8aToHex } from '@polkadot/util';
import dotenv from "dotenv";
dotenv.config();

const wsProvider = new WsProvider("wss://ws.test.azero.dev");

const keyring = new Keyring({ type: 'ed25519' });

const phrase = process.env.PHRASE as string;

const connectToProvider = async () => {
  const api = new ApiPromise({ provider: wsProvider });
  await api.isReady;

  console.log(api.genesisHash.toHex());
};

connectToProvider();

const alice = keyring.addFromUri(phrase);

const message = stringToU8a('this is our message');
const signature = alice.sign(message);
const isValid = alice.verify(message, signature, alice.publicKey);

console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
