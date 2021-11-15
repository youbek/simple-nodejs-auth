import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);
}

export default {
  connect,
};
