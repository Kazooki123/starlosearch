import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;

// Create a supabase client object with your URL and key
const supabase = createClient(supabase_url, supabase_key);

// Get the input elements from the HTML document
const emailInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const submitButton = document.querySelector("a");

// Add a click event listener to the submit button
submitButton.addEventListener("click", async () => {
  // Get the email and password values from the input elements
  const email = emailInput.value;
  const password = passwordInput.value;

  // Use the auth feature of the supabase client to sign in the user
  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  // Check if the sign in was successful
  if (error) {
    // Print the error message
    console.error(error.message);
  } else {
    // Print the user data
    console.log(user);
  }
});
