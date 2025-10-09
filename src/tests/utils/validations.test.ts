import { describe, it, expect } from 'vitest';
import { validateCPF } from '@/utils/validatrions';

describe('Validations', () => {
  describe('validateCPF', () => {
    it('should validate correct CPF', () => {
      expect(validateCPF('111.444.777-35')).toBe(true);
      expect(validateCPF('11144477735')).toBe(true);
    });

    it('should invalidate incorrect CPF', () => {
      expect(validateCPF('111.444.777-36')).toBe(false);
      expect(validateCPF('11144477736')).toBe(false);
    });

    it('should invalidate CPF with all same digits', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
      expect(validateCPF('000.000.000-00')).toBe(false);
      expect(validateCPF('999.999.999-99')).toBe(false);
    });

    it('should invalidate CPF with wrong length', () => {
      expect(validateCPF('123.456.789')).toBe(false);
      expect(validateCPF('123.456.789-001')).toBe(false);
      expect(validateCPF('12345')).toBe(false);
    });

    it('should handle CPF with mask', () => {
      expect(validateCPF('111.444.777-35')).toBe(true);
    });

    it('should handle CPF without mask', () => {
      expect(validateCPF('11144477735')).toBe(true);
    });
  });
});
