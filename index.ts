import express from "express";
import { callContract } from "./contractAPI";
import { signatureRouter } from "./routes";

const app = express();

app.use(express.json());

app.use('/api/signature', signatureRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});