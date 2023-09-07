import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import CharacterList from "../views/CharacterList";

jest.mock("../utils/Api", () => ({
  __esModule: true,
  Api: jest.fn(),
}));

describe("CharacterList Component", () => {
  const sampleCharacters = [
    {
      id: 1,
      name: "Abadango Cluster Princess",
      image: "image1.jpg",
      status: "Alive",
    },
    {
      id: 2,
      name: "Abradolf Lincler",
      image: "image2.jpg",
      status: "Dead",
    },
  ];

  beforeEach(() => {
    const mockedApi = require("../utils/Api");
    mockedApi.Api.mockResolvedValue({
      data: {
        results: sampleCharacters,
        info: { pages: 1 },
      },
    });
  });

  it("renders the CharacterList component", async () => {
    const { getByText, getByLabelText, getByPlaceholderText, findAllByText } =
      render(<CharacterList />);

    expect(getByText("Character List")).toBeInTheDocument();
    expect(getByLabelText("Search By:")).toBeInTheDocument();
    expect(getByLabelText("Search By:")).toHaveValue("name");
    expect(getByPlaceholderText("Search by name")).toBeInTheDocument();

    expect(getByText("Loading...")).toBeInTheDocument();
    expect(findAllByText("Name")).toBeTruthy();
    expect(findAllByText("Status")).toBeTruthy();
    expect(findAllByText("Image")).toBeTruthy();
    expect(findAllByText("Action")).toBeTruthy();

    await waitFor(() => {
      sampleCharacters.forEach((character) => {
        expect(findAllByText(character.name)).toBeTruthy();
        expect(findAllByText(character.status)).toBeTruthy();
        expect(findAllByText(character.name)).toBeTruthy();
      });
    });
  });
});
