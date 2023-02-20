import { Router } from "express";
import { readContract, writeContract } from "../controllers";

export const contractRouter = Router();

contractRouter.get("/read", readContract);
contractRouter.post("/write", writeContract);