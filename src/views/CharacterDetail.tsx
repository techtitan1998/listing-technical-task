import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../utils/Api";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location: { name: string };
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: any }>();

  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    getCharacterDetails(id).then((data) => {
      setCharacter(data);
    });
  }, [id]);

  const getCharacterDetails = async (characterId: string) => {
    try {
      const response: any = await Api("GET", `/character/${characterId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="character-detail-container">
      {character ? (
        <div>
          <h1 className="character-detail-title">Character Details</h1>
          <div className="character-info">
            <span className="heading">Name:</span>
            <span className="sub-heading">{character?.name}</span>
          </div>
          <div className="character-info">
            <span className="heading">Status:</span>
            <span className="sub-heading">{character?.status}</span>
          </div>
          <div className="character-info">
            <span className="heading">Species:</span>
            <span className="sub-heading">{character?.species}</span>
          </div>
          <div className="character-info">
            <span className="heading">Location:</span>
            <span className="sub-heading">{character?.location?.name}</span>
          </div>
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterDetail;
