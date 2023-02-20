import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const contractMetadata = require("./metadata.json");

export const contractAddress = process.env.CONTRACT_ADDRESS as string;