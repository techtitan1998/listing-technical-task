import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetail from "../views/CharacterDetail";

jest.mock("../utils/Api", () => ({
  __esModule: true,
  Api: jest.fn(),
}));

describe("CharacterDetail Component", () => {
  const sampleCharacter = {
    id: 123,
    name: "Fat Morty",
    status: "Alive",
    species: "Human",
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/123.jpeg",
  };

  it("renders the CharacterDetail component with character data", async () => {
    const mockedApi = require("../utils/Api");
    mockedApi.Api.mockResolvedValue({
      data: sampleCharacter,
    });

    const { getByText, findAllByText } = render(
      <MemoryRouter initialEntries={["/character-detail/123"]}>
        <Routes>
          <Route path="/character-detail/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Character Details")).toBeInTheDocument();
      expect(findAllByText("Name: Fat Morty")).toBeTruthy();
      expect(findAllByText("Status: Alive")).toBeTruthy();
      expect(findAllByText("Species: Human")).toBeTruthy();
      expect(findAllByText("Location: Citadel of Ricks")).toBeTruthy();
    });
  });

  it("renders loading message when character data is not available", async () => {
    const mockedApi = require("../utils/Api");
    mockedApi.Api.mockResolvedValue({
      data: null,
    });
    const { getByText } = render(
      <MemoryRouter initialEntries={["/character-detail/123"]}>
        <Routes>
          <Route path="/character-detail/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Loading...")).toBeInTheDocument();
    });
  });
});
