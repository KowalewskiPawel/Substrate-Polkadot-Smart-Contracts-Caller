import { contractAddress, contractMetadata } from "./contractData";
import { accountKeypair } from "../account";
import { MAX_CALL_WEIGHT, PROOFSIZE } from "../consts";
import { initializeProviderApi } from "../wsProviderAPI";
import { ContractPromise } from "@polkadot/api-contract";
import type { WeightV2 } from "@polkadot/types/interfaces";
import { writeTransactionUrl } from "../utils/fs";

export const writeContractCall = async (
  methodName: string,
  args: any[],
  transactionId?: string
) => {
  const providerApi = await initializeProviderApi();

  if (!providerApi) return "No Provider API";

  const contractApi = new ContractPromise(
    providerApi,
    contractMetadata,
    contractAddress
  );

  const storageDepositLimit = null;

  // Execute dry-run query call to fetch required gas value

  const { gasRequired } = await contractApi.query[methodName](
    accountKeypair.address,
    {
      gasLimit: providerApi?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    ...args
  );

  // Create gasLimit value

  const gasLimit = providerApi?.registry.createType(
    "WeightV2",
    gasRequired
  ) as WeightV2;

  // actual smart contract transaction call

  await contractApi.tx[methodName](
    {
      gasLimit,
      storageDepositLimit,
    },
    ...args
  ).signAndSend(accountKeypair, async (res) => {
    if (res.status.isInBlock) {
      console.log("in a block");
      const { number } = await contractApi.api.rpc.chain.getHeader();
      const blockInfo = `https://test.azero.dev/?rpc=wss%3A%2F%2Fws.test.azero.dev#/explorer/query/${number}`;
      if (transactionId) {
        writeTransactionUrl(transactionId, blockInfo);
      }
    } else if (res.status.isFinalized) {
      console.log("finalized");
    }
  });
};

export const readContractCall = async (methodName: string, args: any[]) => {
  // Read only query example

  const providerApi = await initializeProviderApi();

  if (!providerApi) return;

  const contractApi = new ContractPromise(
    providerApi,
    contractMetadata,
    contractAddress
  );

  const storageDepositLimit = null;

  const { result, output } = await contractApi.query[methodName](
    accountKeypair.address,
    {
      gasLimit: providerApi?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    ...args
  );

  // The actual result from RPC as `ContractExecResult`
  console.log(result.toHuman());

  // check if the call was successful
  if (result.isOk) {
    // output the return value
    console.log("Success", output?.toHuman());

    return output?.toHuman();
  } else {
    console.error("Error", result.asErr);
  }
};
