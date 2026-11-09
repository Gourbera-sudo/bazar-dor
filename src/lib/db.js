
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
let isConnected = false;

export async function connection() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db("bazar-dor");
}
