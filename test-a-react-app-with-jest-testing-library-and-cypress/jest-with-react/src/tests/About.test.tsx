import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "../pages/About";

describe("About", () => {
  test("About renders correctly", () => {
    render(<About />);
    // Update to match new heading
    expect(screen.getByText("Welcome to the About Page!")).toBeInTheDocument();
  });

  test("Switch state works correctly", async () => {
    render(<About />);

    // Update to match emoji text
    expect(screen.getByText("🔥 It's on!")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Switch state"));
    expect(screen.getByText("🎢 It's rolling!")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Switch state"));
    expect(screen.getByText("🔥 It's on!")).toBeInTheDocument();
  });

  test("Input works correctly", async () => {
    render(<About />);

    await userEvent.type(screen.getByTestId("testInput"), "Testing the test");
    await userEvent.click(screen.getByText("Print input"));

    expect(screen.getByText("Testing the test")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Print input"));
    expect(screen.queryByText("Testing the test")).not.toBeInTheDocument();
  });
});
