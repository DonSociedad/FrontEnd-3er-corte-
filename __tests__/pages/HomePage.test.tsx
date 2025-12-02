import HomePage from "@/app/page";
import { fireEvent, render, screen } from "@testing-library/react";

describe('HomePage Links', () => {
  test('main links point to correct pages', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /Empezar ahora/i })).toHaveAttribute('href', '/map');
    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toHaveAttribute('href', '/login');
  });
});

describe('HomePage Step cards', () => {

  test('step cards have correct titles', () => {
    render(<HomePage />);
    expect(screen.getByText(/Paso 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Paso 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Meta Final/i)).toBeInTheDocument();
  });
  test('step 1 span exists and has correct initial class', () => {
    render(<HomePage />);
    const span1 = screen.getByText(/Descubre cómo →/i);
    expect(span1).toBeInTheDocument();
    expect(span1).toHaveClass('opacity-0');
});

  test('step 2 span exists and has correct initial class', () => {
    render(<HomePage />);
    const span2 = screen.getByText(/Ver cursos disponibles →/i);
    expect(span2).toBeInTheDocument();
    expect(span2).toHaveClass('opacity-0');
});

  test('meta final span exists and has correct initial class', () => {
    render(<HomePage />);
    const span3 = screen.getByText(/Alcanza la libertad →/i);
    expect(span3).toBeInTheDocument();
    expect(span3).toHaveClass('opacity-0');
});
});