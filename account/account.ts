import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import dotenv from "dotenv";

dotenv.config();

export const initSRAccount = async () => {
  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });

  // Example Alice account
  return keyring.addFromUri("//Alice", { name: "Alice default" });
};

const keyring = new Keyring({ type: "ed25519" });

const phrase = process.env.PHRASE as string;

export const accountKeypair = keyring.addFromUri(phrase);
