import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutFormData } from '@/schemas/checkoutSchema';
import { masks } from '@/utils/masks';

interface PersonalDataFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

export function PersonalDataForm({ register, errors }: PersonalDataFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Dados Pessoais
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" direction="left">
            Nome Completo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            className={`w-full mt-2 ${
              errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpf" direction="left">
              CPF <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              className={`w-full mt-2 ${
                errors.cpf ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              {...register('cpf')}
              onChange={(e) => {
                const masked = masks.cpf(e.target.value);
                e.target.value = masked;
                register('cpf').onChange(e);
              }}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" direction="right">
              Celular <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className={`w-full mt-2 ${
                errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              {...register('phone')}
              onChange={(e) => {
                const masked = masks.celular(e.target.value);
                e.target.value = masked;
                register('phone').onChange(e);
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" direction="left">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`w-full mt-2 ${
              errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
