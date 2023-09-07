import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../components/pagination/Pagination";

describe("Pagination Component", () => {
  it("renders the Pagination component with initial state", () => {
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("renders the Pagination component with active page", () => {
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
    );

    expect(getByText("Previous")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
    expect(getByText("3")).toHaveClass("active");
  });

  it("triggers onPageChange callback when a page is clicked", () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />
    );

    fireEvent.click(getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(getByText("1"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
