import { Request, Response } from "express";

export const verifySignature = (req: Request, res: Response) => {
    try {
      const { signature } = req.body;
      return res.status(200).json({ isSignatureValid: false });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  };
  