import { Router } from "express";
import { readContract, txUrl, writeContract } from "../controllers";

export const contractRouter = Router();

contractRouter
.get("/read", readContract)
.get("/txUrl", txUrl)
.post("/write", writeContract);