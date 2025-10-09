import { describe, it, expect } from 'vitest';
import { masks } from '@/utils/masks';

describe('Masks', () => {
  describe('CPF mask', () => {
    it('should format CPF correctly', () => {
      expect(masks.cpf('12345678900')).toBe('123.456.789-00');
    });

    it('should handle partial CPF', () => {
      expect(masks.cpf('123')).toBe('123');
      expect(masks.cpf('12345')).toBe('123.45');
      expect(masks.cpf('123456789')).toBe('123.456.789');
    });

    it('should remove non-numeric characters', () => {
      expect(masks.cpf('123abc456def789-00')).toBe('123.456.789-00');
    });

    it('should not exceed CPF length', () => {
      expect(masks.cpf('123456789001234')).toBe('123.456.789-00');
    });
  });

  describe('Phone mask', () => {
    it('should format phone correctly', () => {
      expect(masks.celular('11987654321')).toBe('(11) 98765-4321');
    });

    it('should handle partial phone', () => {
      expect(masks.celular('11')).toBe('11');
      expect(masks.celular('119')).toBe('(11) 9');
      expect(masks.celular('1198765')).toBe('(11) 98765');
    });

    it('should remove non-numeric characters', () => {
      expect(masks.celular('11abc98765def4321')).toBe('(11) 98765-4321');
    });

    it('should not exceed phone length', () => {
      expect(masks.celular('119876543219999')).toBe('(11) 98765-4321');
    });
  });

  describe('CEP mask', () => {
    it('should format CEP correctly', () => {
      expect(masks.cep('01310100')).toBe('01310-100');
    });

    it('should handle partial CEP', () => {
      expect(masks.cep('01310')).toBe('01310');
      expect(masks.cep('013101')).toBe('01310-1');
    });

    it('should remove non-numeric characters', () => {
      expect(masks.cep('01310abc100')).toBe('01310-100');
    });

    it('should not exceed CEP length', () => {
      expect(masks.cep('013101009999')).toBe('01310-100');
    });
  });
});
