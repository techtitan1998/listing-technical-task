import React, { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchType, setSearchType] = useState<string>("name");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getAllCharacters(currentPage, searchType, searchValue).then((data) => {
      setCharacters(
        data?.results?.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      );
      setTotalPages(data.info.pages);
    });
  }, [currentPage, searchType, searchValue]);

  const getAllCharacters = async (
    page: number,
    type: string,
    value: string
  ) => {
    try {
      const queryParams = `?page=${page}&${type}=${value}`;
      const response: any = await Api("GET", `/character${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPage(1);
    setSearchValue(event.target.value);
  };
  return (
    <div className="character-list-container">
      <h1 className="character-list-title">Character List</h1>
      <div className="search-container">
        <label htmlFor="searchType" className="search-label">
          Search By:
        </label>
        <select
          id="searchType"
          className="search-dropdown"
          onChange={handleSearchTypeChange}
          value={searchType}
        >
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="species">Species</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          className="search-input"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
      </div>

      <table className="character-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.length > 0 ? (
            characters?.map((character) => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>
                  <img src={character.image} alt={character.name} width="50" />
                </td>
                <td>
                  <Link to={`/character-detail/${character.id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CharacterList;
