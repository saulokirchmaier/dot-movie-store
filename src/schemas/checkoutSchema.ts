import { validateCPF } from '@/utils/validatrions';
import { z } from 'zod';

// Schema de dados pessoais
export const personalDataSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),

  cpf: z.string().min(14, 'CPF inválido').refine(validateCPF, 'CPF inválido'),

  phone: z
    .string()
    .min(15, 'Celular inválido')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato de celular inválido'),

  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
});

// Schema de endereço
export const addressSchema = z.object({
  cep: z
    .string()
    .min(9, 'CEP inválido')
    .regex(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),

  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),

  city: z.string().min(3, 'Cidade deve ter pelo menos 3 caracteres'),

  state: z
    .string()
    .length(2, 'Estado deve ter 2 caracteres')
    .regex(/^[A-Z]{2}$/, 'Use sigla do estado em maiúsculas'),
});

// Schema completo do checkout
export const checkoutSchema = z.object({
  ...personalDataSchema.shape,
  ...addressSchema.shape,
});

export type PersonalDataFormData = z.infer<typeof personalDataSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
