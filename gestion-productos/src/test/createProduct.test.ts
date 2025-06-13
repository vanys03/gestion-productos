/// <reference types="vitest" />
import { createProduct } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { describe, test, expect, vi } from 'vitest';

// Mock de funciones de firestore
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
  return {
    ...actual,
    addDoc: vi.fn(),
    collection: vi.fn(),
    serverTimestamp: () => 'MOCK_TIMESTAMP'
  };
});

describe('createProduct', () => {
  test('crea un producto correctamente en Firestore (mock)', async () => {
    const producto = {
      name: 'Audífonos',
      category: 'Tecnología',
      price: 499,
      rating: 4.7,
      stock: 15
    };

    const fakeDocRef = { id: 'abc123' };

    (collection as any).mockReturnValue('mocked-collection');
    (addDoc as any).mockResolvedValueOnce(fakeDocRef);

    const result = await createProduct(producto);

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'products');
    expect(addDoc).toHaveBeenCalledWith('mocked-collection', {
      ...producto,
      createdAt: 'MOCK_TIMESTAMP',
      updatedAt: 'MOCK_TIMESTAMP'
    });
    expect(result).toBe('abc123');
  });
});