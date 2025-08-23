"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { executeAction } from "@/app/_lib/executeAction";
import { singInAction } from "@/app/_actions/sign-in";
import { authSchema } from "@/app/_lib/zod";

type AuthFormValues = z.infer<typeof authSchema>;

export function AuthForm() {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthFormValues) {
    console.log("Dados enviados:", values);
    // Lógica de login normal (email/senha)
  }

  const handleGoogleLogin = async () => {
    const result = await executeAction({
      actionFn: () => singInAction("google"),
      successMessage: "Login com Google bem-sucedido!",
    });

    if (!result.success) {
      console.error(result.message);
      // Aqui você pode exibir um toast ou feedback visual
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="exemplo@dominio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-500">Ou</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={20} />
        Entrar com Google
      </Button>
    </div>
  );
}
