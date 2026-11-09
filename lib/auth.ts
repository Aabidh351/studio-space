
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db("studiospace");

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        subject: "Reset Your StudioSpace Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; color: #292b27;">
            <h2>Reset Your Password</h2>

            <p>Hello ${user.name},</p>

            <p>
              We received a request to reset your StudioSpace password.
              Click the button below to create a new password.
            </p>

            <a
              href="${url}"
              style="display: inline-block; padding: 12px 24px; background: #344638; color: white; text-decoration: none; border-radius: 4px;"
            >
              Reset Password
            </a>

            <p style="margin-top: 25px; font-size: 13px; color: #74766d;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        throw new Error("Failed to send password reset email.");
      }
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
