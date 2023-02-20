import { Request, Response } from "express";
import { readContractCall, writeContractCall } from "../contractAPI/contractCall";

export const readContract = async (req: Request, res: Response) => {
    try {
      const { methodName } = req.body;

      const readResult = await readContractCall(methodName);

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
      const { methodName } = req.body;

      await writeContractCall(methodName);

      return res.status(200).json({ result: "OK" });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  };
  