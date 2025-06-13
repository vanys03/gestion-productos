/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import FiltersBar from '../components/Product/FiltersBar';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('FiltersBar', () => {
  const mockProps = {
    categories: ['Hogar', 'casa'],
    categoryFilter: '',
    onCategoryChange: vi.fn(),
    priceMin: 0,
    priceMax: 0,
    onPriceMinChange: vi.fn(),
    onPriceMaxChange: vi.fn(),
    onClear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza correctamente el componente FiltersBar', () => {
    render(<FiltersBar {...mockProps} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByLabelText(/precio mínimo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio máximo/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /limpiar filtros/i })
    ).toBeInTheDocument();
  });

  test('dispara onCategoryChange al seleccionar una categoría', async () => {
  render(<FiltersBar {...mockProps} />);

  // Paso 1: abre el menú desplegable
  const select = screen.getByRole('combobox');
  await userEvent.click(select);

  // Paso 2: haz clic en la opción que deseas
  const option = await screen.findByText('casa');
  await userEvent.click(option);

  expect(mockProps.onCategoryChange).toHaveBeenCalledWith('casa');
});


  test('dispara onPriceMinChange al ingresar precio mínimo', () => {
    render(<FiltersBar {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/precio mínimo/i), {
      target: { value: '150' },
    });

    expect(mockProps.onPriceMinChange).toHaveBeenCalledWith(150);
  });

  test('dispara onPriceMaxChange al ingresar precio máximo', () => {
    render(<FiltersBar {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/precio máximo/i), {
      target: { value: '999' },
    });

    expect(mockProps.onPriceMaxChange).toHaveBeenCalledWith(999);
  });

  test('ejecuta onClear al hacer clic en el botón', () => {
    render(<FiltersBar {...mockProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /limpiar filtros/i })
    );

    expect(mockProps.onClear).toHaveBeenCalled();
  });
});
