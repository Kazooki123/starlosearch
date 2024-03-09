// clerk-service.mjs
import Clerk from "@clerk/clerk-js";
import dotenv from "dotenv";

dotenv.config();

const clerkPublishableKey = process.env.CLERK_PUBLISHER_KEY;

async function loadClerk() {
  const clerk = new Clerk(clerkPublishableKey);
  await clerk.load({
    // Assuming you want to redirect to 'load-clerk.html' after sign-in/sign-up
    afterSignInUrl: 'https://starlosearch.vercel.app/index.html',
    afterSignUpUrl: 'https://starlosearch.vercel.app/index.html'
  });
}

loadClerk();
