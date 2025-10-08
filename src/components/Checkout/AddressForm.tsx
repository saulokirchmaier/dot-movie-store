import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutFormData } from '@/schemas/checkoutSchema';
import { masks } from '@/utils/masks';

interface AddressFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

export function AddressForm({ register, errors }: AddressFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Endereço</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cep" direction="left">
              CEP <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cep"
              type="text"
              placeholder="00000-000"
              className={`w-full mt-2 ${
                errors.cep ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              {...register('cep')}
              onChange={(e) => {
                const masked = masks.cep(e.target.value);
                e.target.value = masked;
                register('cep').onChange(e);
              }}
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address" direction="left">
              Endereço <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Rua, número, complemento"
              className={`w-full mt-2 ${
                errors.address
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              }`}
              {...register('address')}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" direction="left">
              Cidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Sua cidade"
              className={`w-full mt-2 ${
                errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              {...register('city')}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state" direction="right">
              Estado <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="UF"
              maxLength={2}
              className={`w-full mt-2 uppercase ${
                errors.state ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              {...register('state')}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register('state').onChange(e);
              }}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
