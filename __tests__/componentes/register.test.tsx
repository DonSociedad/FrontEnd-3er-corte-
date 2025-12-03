import { render, screen, fireEvent } from "@testing-library/react";
import RegisterComponent from "@/components/molecules/auth/registerComponents";
import { useRegister } from "@/hooks/auth/useRegister";
import { useRouter } from "next/navigation";

// Mock del hook y del router
jest.mock("@/hooks/auth/useRegister", () => ({
  useRegister: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterComponent UI", () => {
  test("renders all inputs and button", () => {
    (useRegister as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(
        (fn: (data?: unknown) => void) =>
          (e: React.FormEvent<HTMLFormElement>) => fn(e)
      ),
      onSubmit: jest.fn(),
      onErrors: jest.fn(),
      errors: {},
    });

    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<RegisterComponent />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrate/i })).toBeInTheDocument();
  });

  test("submits the form and calls onSubmit", () => {
    const mockSubmit = jest.fn();

    (useRegister as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(
        (fn: (data?: unknown) => void) =>
          (e: React.FormEvent<HTMLFormElement>) => fn(e)
      ),
      onSubmit: mockSubmit,
      onErrors: jest.fn(),
      errors: {},
    });

    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<RegisterComponent />);

    const form = screen.getByTestId("form") as HTMLFormElement;

    fireEvent.submit(form); // FireEvent recibe HTMLFormElement correctamente tipado

    expect(mockSubmit).toHaveBeenCalled();
  });
});
