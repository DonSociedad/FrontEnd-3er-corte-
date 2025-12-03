import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/molecules/shopPig/productCartComponent";
import { IProduct } from "@/interfaces/products/product";

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// Mock getPigAssetPath
jest.mock("@/utils/pigHelpers", () => ({
  getPigAssetPath: (category: string, key: string) => `/mocked/${category}/${key}.png`,
}));

describe("ProductCard", () => {
  const product: IProduct = {
    id: "1",
    key: "product1",
    name: "Producto 1",
    category: "categoryA",
    price: 100,
  };

  test("renders product name and image", () => {
    render(<ProductCard product={product} isOwned={false} canAfford={true} isProcessing={false} onBuy={jest.fn()} />);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByAltText("Producto 1")).toHaveAttribute("src", "/mocked/categoryA/product1.png");
  });

  test("shows 'Faltan monedas' if cannot afford and not owned", () => {
    render(<ProductCard product={product} isOwned={false} canAfford={false} isProcessing={false} onBuy={jest.fn()} />);
    
    expect(screen.getByText(/Faltan monedas/i)).toBeInTheDocument();
  });

  test("calls onBuy when button is clicked", () => {
    const mockOnBuy = jest.fn();
    render(<ProductCard product={product} isOwned={false} canAfford={true} isProcessing={false} onBuy={mockOnBuy} />);

    const button = screen.getByRole("button", { name: /100/i });
    fireEvent.click(button);

    expect(mockOnBuy).toHaveBeenCalledWith(product);
  });

  test("button shows 'En Inventario' if owned", () => {
    render(<ProductCard product={product} isOwned={true} canAfford={true} isProcessing={false} onBuy={jest.fn()} />);

    expect(screen.getByText(/En Inventario/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("button shows 'Procesando...' if isProcessing", () => {
    render(<ProductCard product={product} isOwned={false} canAfford={true} isProcessing={true} onBuy={jest.fn()} />);

    expect(screen.getByText(/Procesando/i)).toBeInTheDocument();
  });
});
