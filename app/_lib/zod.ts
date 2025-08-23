import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const budgetSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(1, { message: "Nome é obrigatório" }),
  clinicName: z
    .string({ message: "Nome da clínica é obrigatório" })
    .min(1, { message: "Nome da clínica é obrigatório" }),
  email: z
    .string({ message: "E-mail é obrigatório" })
    .email("E-mail inválido")
    .min(1, { message: "E-mail é obrigatório" }),
  phone: z
    .string({ message: "Telefone é obrigatório" })
    .min(1, { message: "Telefone é obrigatório" }),
  message: z
    .string({ message: "Mensagem é obrigatória" })
    .min(1, { message: "Mensagem é obrigatória" }),
});
