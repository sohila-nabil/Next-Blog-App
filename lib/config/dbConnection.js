import mongoose from "mongoose";

export const dbConnection = async()=>{
    await mongoose.connect(
      "mongodb+srv://nsohila03_db_user:S4bVcUVG4k0pN2dS@cluster0.gerh7fm.mongodb.net/next-blogApp"
    );
    console.log('DB Connected');
    
}
// G9urSKvFlDIGbEnR