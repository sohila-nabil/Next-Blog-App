import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";
import { createOrUpdateUser, deleteUser } from "../../../../lib/services/user";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    console.log("Webhook event:", evt.type);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt.data;

      const email = email_addresses[0]?.email_address;

      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email,
        username,
      );

      console.log("Mongo User:", user);

      if (user && evt.type === "user.created") {
        const client = await clerkClient();

        const updated = await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userMongoId: user._id.toString(),
            isAdmin: user.isAdmin,
            role: user.role,
          },
        });

        console.log("Updated metadata:", updated.publicMetadata);
      }
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      await deleteUser(id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
