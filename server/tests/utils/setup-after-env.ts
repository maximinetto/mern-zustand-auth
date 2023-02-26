import mongoose from "mongoose";
import { HOST_DB, PASS_DB, PORT_DB, USER_DB } from "../../config";

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  console.debug(USER_DB, PASS_DB, HOST_DB, PORT_DB);
  await mongoose.connect(`mongodb://${HOST_DB}:${PORT_DB}/auth`, {
    authSource: "admin",
    user: USER_DB,
    pass: PASS_DB,
  });
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();
  for (let collection of allCollections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});
