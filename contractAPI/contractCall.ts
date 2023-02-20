import { contractAddress, contractMetadata } from "./contractData";
import { accountKeypair } from "../account";
import { MAX_CALL_WEIGHT, PROOFSIZE } from "../consts";
import { initializeProviderApi } from "../wsProviderAPI";
import { ContractPromise } from "@polkadot/api-contract";
import type { WeightV2 } from "@polkadot/types/interfaces";

export const callContract = async () => {
  const providerApi = await initializeProviderApi();

    if (!providerApi) return;

    const contractApi = new ContractPromise(providerApi, contractMetadata, contractAddress);
  
    const storageDepositLimit = null;
  
    // Execute dry-run query call to fetch required gas value
  
    const { gasRequired } = await contractApi.query.flip(accountKeypair.address, {
      gasLimit: providerApi?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    });
  
    // Create gasLimit value
  
    const gasLimit = providerApi?.registry.createType(
      "WeightV2",
      gasRequired
    ) as WeightV2;
  
    // actual smart contract transaction call
  
    await contractApi.tx
      .flip({
        gasLimit,
        storageDepositLimit,
      })
      .signAndSend(accountKeypair, async (res) => {
        if (res.status.isInBlock) {
          console.log("in a block");
        } else if (res.status.isFinalized) {
          console.log("finalized");
        }
      });
  
      // Read only query example
  
    const { result, output } = await contractApi.query.get(accountKeypair.address, {
      gasLimit: providerApi?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    });
  
    // The actual result from RPC as `ContractExecResult`
    console.log(result.toHuman());
  
    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log("Success", output?.toHuman());
    } else {
      console.error("Error", result.asErr);
    }
  };