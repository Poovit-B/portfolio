import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe("DIV");
  });

  it("passes className to the element", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });

  it("renders complex children", () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("includes base classes in className", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    // Check that base classes are included in className string
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("rounded-xl");
  });
});
