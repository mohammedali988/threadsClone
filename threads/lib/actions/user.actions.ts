"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface Params {
  userId: string;
  userName: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  userName,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDb();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        userName: userName.toLowerCase(),
        name,
        bio,
        image,
        onboarding: true,
      },
      {
        upsert: true,
      }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export const fetchUser = async (userId:string) => {

  try{

    connectToDb()

    return await User.findOne({id: userId})

  }
  catch(error:any){
    throw new Error(`Failed to fetch user: ${error.message}`);

  }
}
