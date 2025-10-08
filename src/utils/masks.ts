/**
 * Funções de máscara para inputs
 */

export const masks = {
  /**
   * Máscara de CPF: 999.999.999-99
   */
  cpf: (value: string): string => {
    return value
      .replace(/\D/g, '') // Remove não-dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Adiciona hífen
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita a 11 dígitos
  },

  /**
   * Máscara de Celular: (99) 99999-9999
   */
  celular: (value: string): string => {
    return value
      .replace(/\D/g, '') // Remove não-dígitos
      .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
      .replace(/(-\d{4})\d+?$/, '$1'); // Limita a 11 dígitos
  },

  /**
   * Máscara de CEP: 99999-999
   */
  cep: (value: string): string => {
    return value
      .replace(/\D/g, '') // Remove não-dígitos
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
      .replace(/(-\d{3})\d+?$/, '$1'); // Limita a 8 dígitos
  },

  /**
   * Remove máscara (mantém apenas dígitos)
   */
  unmask: (value: string): string => {
    return value.replace(/\D/g, '');
  },
};

/**
 * Hook para aplicar máscara em onChange
 */
export const applyMask = (
  value: string,
  maskFn: (value: string) => string
): string => {
  return maskFn(value);
};
