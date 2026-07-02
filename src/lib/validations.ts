import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  full_name: z.string().min(1, "Le nom est requis").optional(),
});

export const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
