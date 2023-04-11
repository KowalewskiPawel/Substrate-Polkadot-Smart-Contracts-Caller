import { ApiPromise, WsProvider } from "@polkadot/api";
import dotenv from "dotenv";

dotenv.config();

const wsProvider = new WsProvider(process.env.WSPROVIDER);

export const initializeProviderApi = async () => {
  try {
    const providerApi = new ApiPromise({ provider: wsProvider });
    await providerApi.isReady;

    return providerApi;
  } catch (err) {
    console.error(err);
  }
};
