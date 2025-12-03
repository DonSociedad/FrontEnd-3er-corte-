import { render, screen, fireEvent } from "@testing-library/react";
import LoginComponent from "@/components/molecules/auth/loginComponents";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

// Mock del hook y del router
jest.mock("@/hooks/auth/useLogin", () => ({
  useLogin: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginComponent UI", () => {
  test("renders inputs and button", () => {
    (useLogin as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn((fn: (data?: any) => void) => (e: React.FormEvent<HTMLFormElement>) => fn(e)),
      onSubmit: jest.fn(),
      onErrors: jest.fn(),
      errors: {},
    });

    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<LoginComponent />);

    expect(screen.getByLabelText("Usuario o correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test("submits form and calls useLogin.onSubmit", () => {
    const mockSubmit = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn((fn: (data?: any) => void) => (e: React.FormEvent<HTMLFormElement>) => fn(e)),
      onSubmit: mockSubmit,
      onErrors: jest.fn(),
      errors: {},
    });

    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<LoginComponent />);

    // Para que esto funcione, agrega data-testid="form" en tu LoginComponent
    fireEvent.submit(screen.getByTestId("form"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
