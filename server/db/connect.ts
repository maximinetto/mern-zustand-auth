import mongoose from "mongoose";
import { HOST_DB, PASS_DB, PORT_DB, USER_DB } from "../config";

async function connect(): Promise<void> {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST_DB}:${PORT_DB}/auth`, {
    authSource: "admin",
    user: USER_DB,
    pass: PASS_DB,
  });
}

export default connect;
