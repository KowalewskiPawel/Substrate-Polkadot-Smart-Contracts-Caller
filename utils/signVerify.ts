import {
  cryptoWaitReady,
  decodeAddress,
  signatureVerify,
} from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";

const isValidSignature = (
  signedMessage: string,
  signature: string,
  address: string
) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

export const signVerify = async (
  message: string,
  signature: string,
  publicAddress: string
) => {
  //Some interfaces, such as using sr25519 however are only available via WASM
  try {
    await cryptoWaitReady();
    const isValid = isValidSignature(message, signature, publicAddress);

    return isValid;
  } catch (err) {
    console.error(err);
  }
};
