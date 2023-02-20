import { Router } from "express";
import { verifySignature } from "../controllers";

export const signatureRouter = Router();

signatureRouter.get("/verify", verifySignature);