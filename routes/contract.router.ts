import { Router } from "express";
import { readContract, txUrl, writeContract } from "../controllers";

export const contractRouter = Router();

contractRouter
.get("/read", readContract)
.post("/txUrl", txUrl)
.post("/write", writeContract);