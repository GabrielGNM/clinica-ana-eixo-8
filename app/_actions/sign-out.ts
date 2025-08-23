"use server";
import { signOut } from "../_lib/auth";

export async function singOutAction() {
  await signOut( {
    redirectTo: "/dashboard",
  });
}
