import { dbConnection } from "../config/dbConnection";
import User from "../models/userModel";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
) => {
  try {
    await dbConnection();
    const user = await User.findByIdAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { upsert: true },
    );

    return user;
  } catch (error) {
    console.log("error create or update user", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await dbConnection();
    const user = await User.findByIdAndDelete({ clerkId: id });
    if (!user) {
      console.log("user not exist");
    }
  } catch (error) {
    console.log("error deleteing user", error);
  }
};
