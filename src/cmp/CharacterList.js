import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import env from "react-dotenv";

const CharacterList = () => {
  const [characters, setCharacters] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${env.API_URL}/characters`)
      .then((res) => {
        const responseCharacters = res.data;
        const data = responseCharacters.characters;

        setCharacters(data);

        console.log(data);
      })
      .catch(() => {
        console.log("Error caught!");
      });
  }, []);

  return (
    <div>
      <div className="character-list d-flex justify-content-center">
        {characters ? (
          characters.map((character) => (
            <div
              onClick={() => history.push(`/character/${character._id}`)}
              className="card"
              style={{ width: "18rem" }}
              key={character._id}
            >
              <img
                src={character.img}
                className="card-img-top"
                alt="Character Profile"
              ></img>
              <div className="overlay"></div>
              <div className="card-body">
                <h5 className="card-title bg-dark text-light text-center">
                  {character.name}
                </h5>
                <div className="row card-body-content">
                  <h6 className="col-4 card-subtitle mb-2">
                    LVL: {character.level}
                  </h6>
                  <h6 className="col-8 card-subtitle mb-2 text-end">
                    RACE: {character.race}
                  </h6>
                  <hr></hr>
                  <p className="card-text">
                    <b>Alignment:</b> {character.alignment}
                    <br></br>
                    <b>Residence:</b> {character.residence}
                    <br></br>
                    <b>Job:</b> {character.job}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading-icon">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
