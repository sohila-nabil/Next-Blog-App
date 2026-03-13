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

      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      );

      if (user && evt.type === "user.created") {
        const client = await clerkClient();

        await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userMongoId: user._id,
            isAdmin: user.isAdmin,
          },
        });

        console.log("Metadata updated");
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
