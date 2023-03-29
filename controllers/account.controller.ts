import { Request, Response } from "express";
import { accountKeypair } from "../account";
import { encodeAddress } from '@polkadot/keyring';

export const getAccountPublicKey = async (_req: Request, res: Response) => {
    try {

      const accountPublicKey = encodeAddress(accountKeypair.publicKey)

      return res.status(200).json({ accountPublicKey });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  };
  