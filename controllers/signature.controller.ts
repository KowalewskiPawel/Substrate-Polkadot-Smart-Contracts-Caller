import { Request, Response } from "express";
import { signVerify } from "../utils/signVerify";

export const verifySignature = async (req: Request, res: Response) => {
    try {
      const { message, signature, publicAddress } = req.query as { [key: string]: string };

      const isSignValid = await signVerify(message, signature, publicAddress);

      return res.status(200).json({ isSignatureValid: isSignValid });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  };
  