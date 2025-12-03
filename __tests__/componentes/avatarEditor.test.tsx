import { render, screen, fireEvent } from "@testing-library/react";
import AvatarEditor from "@/components/organism/profile/avatarEditorComponent";
import useProducts from "@/hooks/products/useProducts";

// Mock del hook
jest.mock("@/hooks/products/useProducts");
const mockUseProducts = useProducts as jest.Mock;

// Mock de onEquip
const mockOnEquip = jest.fn();

describe("AvatarEditor Component", () => {
  const pigData = {
    inventory: ["hat1", "body1", "hat2"], //item que se va a testear
    equipped: { hat: "hat1", body: "body1", eyes: "", mouth: "", skin: "" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: false,
    });

    render(<AvatarEditor pigData={pigData} onEquip={mockOnEquip} />);

    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: true,
    });

    render(<AvatarEditor pigData={pigData} onEquip={mockOnEquip} />);

    expect(screen.getByText("Error al cargar productos")).toBeInTheDocument();
  });

  test("calls onEquip when clicking an item", () => {
    mockUseProducts.mockReturnValue({
      products: [
        { id: "1", key: "hat2", name: "Sombrero Cool", price: 100, category: "hats", createdAt: "" },
      ],
      loading: false,
      error: false,
    });

    render(<AvatarEditor pigData={pigData} onEquip={mockOnEquip} />);

    const itemButton = screen.getByText("Sombrero Cool").closest("button");
    expect(itemButton).toBeInTheDocument();

    if (itemButton) fireEvent.click(itemButton);

    expect(mockOnEquip).toHaveBeenCalledWith("hats", "hat2");
  });

  test("switches tab correctly", () => {
    mockUseProducts.mockReturnValue({
      products: [
        { id: "2", key: "body1", name: "Ropa Cool", price: 200, category: "bodies", createdAt: "" },
      ],
      loading: false,
      error: false,
    });

    render(<AvatarEditor pigData={pigData} onEquip={mockOnEquip} />);

    const bodiesTab = screen.getByText("Ropa");
    fireEvent.click(bodiesTab);

    const bodyItem = screen.getByText("Ropa Cool").closest("button");
    expect(bodyItem).toBeInTheDocument();
  });
});
