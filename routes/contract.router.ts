import { Router } from "express";
import { checkCodeHash, readContract, txUrl, writeContract } from "../controllers";

export const contractRouter = Router();

contractRouter
.get("/read", readContract)
.get("/codeHash", checkCodeHash)
.get("/txUrl", txUrl)
.post("/write", writeContract);