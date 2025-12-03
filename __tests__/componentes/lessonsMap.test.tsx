import { render, screen, fireEvent } from "@testing-library/react";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";
import { useRouter } from "next/navigation";

// Mock hooks
jest.mock("@/hooks/lessons/useLessonsMap");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock LessonNode
jest.mock("@/components/atoms/lessons/lessonNode", () => ({
  LessonNode: ({ title, onClick }: { title: string; onClick: () => void }) => (
    <div onClick={onClick}>{title}</div>
  ),
}));

describe("LessonsMap Component", () => {
  const mockGoToLesson = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useLessonsMap as jest.Mock).mockReturnValue({
      lessons: [
        { id: "1", title: "Lección 1", status: "locked" },
        { id: "2", title: "Lección 2", status: "unlocked" },
      ],
      loading: false,
      goToLesson: mockGoToLesson,
    });

    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  test("calls goToLesson when clicking on a lesson node", () => {
    render(<LessonsMap />);

    const lessonNodes = screen.getAllByText(/Lección \d/i);
    fireEvent.click(lessonNodes[0]);

    expect(mockGoToLesson).toHaveBeenCalledWith("1");
  });

  test("calls router.back when clicking back button", () => {
    render(<LessonsMap />);

    const backButton = screen.getByRole("button", { name: /volver/i });
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });
});
