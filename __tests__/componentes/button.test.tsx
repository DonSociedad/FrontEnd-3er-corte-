import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmerPageButton from "@/components/atoms/buttons/emerPageButtonComponent";
import ButtonComponent from "@/components/atoms/buttonComponents";
import NextButton from "@/components/atoms/nextButton";
import OptionButton from "@/components/atoms/optionButton";

describe("EmerPageButton", () => {
  test("renders main button", () => {
    render(
      <EmerPageButton buttonLabel="Abrir" buttonStyle="btn">
        <p>Contenido</p>
      </EmerPageButton>
    );

    expect(screen.getByText("Abrir")).toBeInTheDocument();
  });

  test("opens modal when button is clicked", () => {
    render(
      <EmerPageButton buttonLabel="Abrir" buttonStyle="btn">
        <p>Contenido</p>
      </EmerPageButton>
    );

    fireEvent.click(screen.getByText("Abrir"));

    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

test("closes modal when clicking overlay", async () => {
  render(
    <EmerPageButton buttonLabel="Abrir">
      <p>Contenido</p>
    </EmerPageButton>
  );

  fireEvent.click(screen.getByText("Abrir"));

  // Obtener overlay mediante parentElement
  const content = screen.getByText("Contenido");
  const modalContainer = content.closest("div"); 
  const overlay = modalContainer?.parentElement; 

  fireEvent.click(overlay!);

  await waitFor(() => {
    expect(screen.queryByText("Contenido")).not.toBeInTheDocument();
  });
});

});

// -----------------------------------------------------------
// ButtonComponent
// -----------------------------------------------------------
describe("ButtonComponent", () => {
  test("renders with text and icon", () => {
    render(<ButtonComponent type={1}  content="Click here" icon={<span>⭐</span>} />);
    expect(screen.getByText("Click here")).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  test("triggers onClick", () => {
    const mockFn = jest.fn();
    render(<ButtonComponent type={3}  content="Click" onClick={mockFn} />);
    fireEvent.click(screen.getByText("Click"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

// -----------------------------------------------------------
// NextButton
// -----------------------------------------------------------
describe("NextButton", () => {
  test("renders with default label", () => {
    render(<NextButton />);
    expect(screen.getByText("Siguiente")).toBeInTheDocument();
  });

  test("is disabled when prop disabled=true", () => {
    render(<NextButton disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

// -----------------------------------------------------------
// OptionButton
// -----------------------------------------------------------
describe("OptionButton", () => {
  test("renders children correctly", () => {
    render(<OptionButton>Mi opción</OptionButton>);
    expect(screen.getByText("Mi opción")).toBeInTheDocument();
  });

  test("calls onClick", () => {
    const mockFn = jest.fn();
    render(<OptionButton onClick={mockFn}>Opción</OptionButton>);
    fireEvent.click(screen.getByText("Opción"));
    expect(mockFn).toHaveBeenCalled();
  });

  test("disabled prevents click", () => {
    const mockFn = jest.fn();
    render(<OptionButton disabled onClick={mockFn}>Disabled</OptionButton>);
    fireEvent.click(screen.getByText("Disabled"));
    expect(mockFn).not.toHaveBeenCalled();
  });
});