"use server";
import { signIn } from "../_lib/auth";

export async function singInAction(provider: string) {
  await signIn(provider, {
    redirectTo: "/dashboard",
  });
}
