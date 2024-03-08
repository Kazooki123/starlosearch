// clerk-service.mjs
import Clerk from "@clerk/clerk-js"

const clerkPublishableKey = `pk_test_cGxlYXNpbmctcmVpbmRlZXItNTEuY2xlcmsuYWNjb3VudHMuZGV2JA`;

async function loadClerk() {
  const clerk = new Clerk(clerkPublishableKey);
  await clerk.load({
    // Assuming you want to redirect to 'load-clerk.html' after sign-in/sign-up
    afterSignInUrl: 'https://starlosearch.vercel.app/index.html',
    afterSignUpUrl: 'https://starlosearch.vercel.app/index.html'
  });
}

loadClerk();
