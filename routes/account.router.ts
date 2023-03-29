import { Router } from "express";
import { getAccountPublicKey } from "../controllers";

export const accountRouter = Router();

accountRouter.get("/publicKey", getAccountPublicKey);