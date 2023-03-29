import { readFileSync, writeFileSync } from "fs";

export const getTransactionUrl = (transactionId: string) => {
  const transactionsFile = readFileSync("./transactions.json");
  const transactions = JSON.parse(String(transactionsFile));
  return transactions[transactionId];
};

export const writeTransactionUrl = (transactionId: string, transactionUrl: string) => {
  const transactionsFile = readFileSync("./transactions.json");
  const transactions = JSON.parse(String(transactionsFile));
  const transactionsString = JSON.stringify({ [transactionId]: transactionUrl, ...transactions }, null, 2);
  writeFileSync("./transactions.json", transactionsString);
};
