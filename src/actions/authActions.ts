"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  updatePasswordSchema,
} from "@/schemas";
import { headers } from "next/headers";

export async function signup(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    redirect("/auth/register?message=Invalid form fields!");
  }

  const { username, email, password } = validatedFields.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    redirect("/auth/register?message=Oops, something went wrong!");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
export async function login(formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    redirect("/auth/login?message=Invalid form fields!");
  }

  const { email, password } = validatedFields.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/auth/login?message=Oops, something went wrong!");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function forgotPassword(formData: FormData) {
  const validatedData = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedData.success) {
    redirect("/auth/forgot-password?message=Invalid form fields!");
  }

  const { email } = validatedData.data;
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/update-password`,
  });

  if (error) {
    console.log(error);
    redirect("/auth/forgot-password?message=Oops, something went wrong!");
  } else {
    redirect(
      "/auth/forgot-password?success=Password reset link sent to your email!"
    );
  }
}

export async function updatePassword(formData: FormData) {
  const validatedData = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    code: formData.get("code"),
  });

  if (!validatedData.success) {
    redirect("/auth/update-password?message=Invalid form fields!");
  }

  const { password: newPassword, code } = validatedData.data;
  const supabase = createClient();

  // login

  const { error: signInError, data: signInData } =
    await supabase.auth.exchangeCodeForSession(code as string);

  if (signInError) {
    console.log(signInError);
    redirect("/auth/update-password?message=Invalid password reset link!");
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error);
    redirect("/auth/update-password?message=Oops, something went wrong!");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
