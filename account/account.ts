import { Keyring } from "@polkadot/api";
import dotenv from "dotenv";

dotenv.config();

const keyring = new Keyring({ type: "ed25519" });

const phrase = process.env.PHRASE as string;

export const accountKeypair = keyring.addFromUri(phrase);