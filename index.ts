import express from "express";
import { contractRouter, signatureRouter, accountRouter } from "./routes";

const app = express();

app.use(express.json());

app.use('/api/signature', signatureRouter);
app.use('/api/contract', contractRouter);
app.use('/api/account', accountRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});