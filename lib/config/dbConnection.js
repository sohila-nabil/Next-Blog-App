import mongoose from "mongoose";

let initialized = false;

export const dbConnection = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("Already Connected to Mongodb");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
    initialized = true;
  } catch (error) {
    console.log('error connecting to db', error);
    
  }
};
// G9urSKvFlDIGbEnR
