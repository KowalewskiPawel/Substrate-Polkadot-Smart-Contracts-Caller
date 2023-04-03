import { randomUUID } from "crypto";
import { Request, Response } from "express";
import {
  readContractCall,
  writeContractCall,
} from "../contractAPI/contractCall";
import { getTransactionUrl } from "../utils/fs";

export const readContract = async (req: Request, res: Response) => {
  try {
    const { methodName, args } = req.body;

    const readResult = await readContractCall(methodName, args);

    return res.status(200).json({ result: readResult });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

export const writeContract = async (req: Request, res: Response) => {
  try {
    const { methodName, args } = req.body;

    const transactionId = randomUUID();

    const callResult = await writeContractCall(methodName, args, transactionId);

    if (callResult !== "OK") {
      return res.status(500).json({
        error: true,
        message: JSON.stringify(callResult) || "Something went wrong",
      });
    }
    
    return res.status(200).json({ transactionId });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: JSON.stringify(err) || "Something went wrong",
    });
  }
};

export const txUrl = async (req: Request, res: Response) => {
  try {
    const { txId } = req.body;

    const txUrl = getTransactionUrl(txId);

    return res.status(200).json({ transactionBlockUrl: txUrl });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
};
