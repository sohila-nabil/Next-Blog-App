import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { createOrUpdateUser, deleteUser } from "../../../../lib/services/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt.data;
      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username,
        );
        if (user && evt.type === "user.created") {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin,
              },
            });
          } catch (error) {
            console.log("updateUserMetadata", error);
          }
        }
      } catch (error) {
        console.log("Webhook with create user error", error);
      }
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      try {
        await deleteUser(id);
      } catch (error) {
        console.log("delete user from route webhook", error);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
