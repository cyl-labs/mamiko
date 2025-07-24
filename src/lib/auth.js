import { supabase } from "./supabase";

export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/products",
    },
  });

  return { data, error };
}

export async function changePassword({ email, oldPassword, newPassword }) {
  console.log(email);
  console.log(oldPassword);
  console.log(newPassword);
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });

  if (!signInError) {
    const { error: updateUserError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return updateUserError;
  }

  return signInError;
}
