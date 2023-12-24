import mongoose from "mongoose";
import { DB_CONFIG } from "../utils/constants.js";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  // const db = await mongoose.connect(DB_CONFIG.CONN_STRING);
  
  // const db = await mongoose.connect("mongodb+srv://danperlmanprog:YXKnG8S0NE4kVapI@inventory-app.strew6i.mongodb.net/?retryWrites=true&w=majority")
  const db = await mongoose.connect("mongodb+srv://danperlmanprog:YXKnG8S0NE4kVapI@inventory-app.strew6i.mongodb.net/sync-stores")


  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
