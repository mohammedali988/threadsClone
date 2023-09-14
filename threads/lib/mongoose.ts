import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("MONGODB_URL ARE NOT FOUND!");

  if (isConnected) return console.log("Already is connected");

  try {
    mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("Here is the error while connecting to mongoDB!", err);
  }
};
