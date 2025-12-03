import { render, screen, fireEvent } from "@testing-library/react";
import HeaderComponent from "@/components/organism/headerComponent";
import { useHeader } from "@/hooks/compotents/useHeader";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/compotents/useHeader");
jest.mock("@/contexts/authContext");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseHeader = useHeader as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe("HeaderComponent", () => {
  const mockRouterPush = jest.fn();
  const mockLogout = jest.fn();
  const mockOnNavigate = jest.fn();
  const mockHandleSwitchAccount = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({ push: mockRouterPush });
    mockUseHeader.mockReturnValue({
      onNavigate: mockOnNavigate,
      showUserMenu: false,
      setShowUserMenu: jest.fn(),
      menuRef: { current: null },
      handleSwitchAccount: mockHandleSwitchAccount,
    });
  });

  test("renders basic links when not authenticated", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, logout: mockLogout });

    render(<HeaderComponent />);

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Aprender")).toBeInTheDocument();
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.queryByText("Tienda")).not.toBeInTheDocument();
  });

  test("renders user links when authenticated", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, logout: mockLogout });

    render(<HeaderComponent />);

    expect(screen.getByText("Tienda")).toBeInTheDocument();
    expect(screen.getByText("Notificaciones")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  test("clicking profile when not authenticated calls router.push('/login')", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, logout: mockLogout });

    render(<HeaderComponent />);
    fireEvent.click(screen.getByText("Iniciar Sesión"));

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  test("clicking logout calls logout function", () => {
    const setShowUserMenu = jest.fn();
    mockUseHeader.mockReturnValue({
      onNavigate: mockOnNavigate,
      showUserMenu: true,
      setShowUserMenu,
      menuRef: { current: null },
      handleSwitchAccount: mockHandleSwitchAccount,
    });
    mockUseAuth.mockReturnValue({ isAuthenticated: true, logout: mockLogout });

    render(<HeaderComponent />);
    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(mockLogout).toHaveBeenCalled();
    expect(setShowUserMenu).toHaveBeenCalledWith(false);
  });

  test("clicking 'Ver Perfil' calls onNavigate('profile')", () => {
    const setShowUserMenu = jest.fn();
    mockUseHeader.mockReturnValue({
      onNavigate: mockOnNavigate,
      showUserMenu: true,
      setShowUserMenu,
      menuRef: { current: null },
      handleSwitchAccount: mockHandleSwitchAccount,
    });
    mockUseAuth.mockReturnValue({ isAuthenticated: true, logout: mockLogout });

    render(<HeaderComponent />);
    fireEvent.click(screen.getByText("Ver Perfil"));

    expect(mockOnNavigate).toHaveBeenCalledWith("profile");
    expect(setShowUserMenu).toHaveBeenCalledWith(false);
  });
});
