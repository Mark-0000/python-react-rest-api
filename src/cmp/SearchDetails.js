import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { CircularProgress } from "@material-ui/core";
import env from 'react-dotenv'


const SearchDetails = () => {
  const history = useHistory();
  const { searchName } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState("");
  const [alignment, setAlignment] = useState("");
  const [residence, setResidence] = useState("");
  const [job, setJob] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    axios
      .get(`${env.API_URL}/search/${searchName}`)
      .then((res) => {
        const responseCharacter = res.data;
        setId(responseCharacter._id);
        setName(responseCharacter.name);
        setRace(responseCharacter.race);
        setLevel(responseCharacter.level);
        setAlignment(responseCharacter.alignment);
        setJob(responseCharacter.job);
        setResidence(responseCharacter.residence);
        setImg(responseCharacter.img);
        console.log("SEARCH DETAILS");
        console.log(responseCharacter);
      })
      .catch(() => {
        console.log("Error caught!");
      });
  }, [searchName]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const raceHandler = (e) => {
    setRace(e.target.value);
  };
  const levelHandler = (e) => {
    setLevel(e.target.value);
  };
  const alignmentHandler = (e) => {
    setAlignment(e.target.value);
  };
  const jobHandler = (e) => {
    setJob(e.target.value);
  };
  const residenceHandler = (e) => {
    setResidence(e.target.value);
  };
  const imgHandler = (e) => {
    setImg(e.target.value);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${env.API_URL}/characters`, {
        _id: id,
        name: name,
        race: race,
        level: level,
        alignment: alignment,
        job: job,
        residence: residence,
        img: img,
      })
      .then((res) => {
        console.log("Update successful!");
        history.push("/");
      });
  };
  const deleteHandler = (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this?</p>
            <button className="confirm-no" onClick={onClose}>
              No
            </button>
            <button
              className="confirm-yes"
              onClick={() => {
                e.preventDefault();
                console.log("DELETE: ", id);
                axios
                  .delete(`${env.API_URL}/characters/${id}`)
                  .then((res) => {
                    console.log("Delete successful!");
                    history.push("/");
                  });
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };
  return (
    <div className="character-details">
      {name ? (
        <div className="character-info">
          <div className="row">
            <div className="col-5">
              <img src={img} className="character-info-img" alt=""></img>
            </div>
            <div className="col-7">
              <form>
                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={nameHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={name}
                      />
                      <label htmlFor="floatingValue">Name:</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={raceHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={race}
                      />
                      <label htmlFor="floatingValue">Race:</label>
                    </div>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={levelHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={level}
                      />
                      <label htmlFor="floatingValue">Level:</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={alignmentHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={alignment}
                      />
                      <label htmlFor="floatingValue">Alignment:</label>
                    </div>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={jobHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={job}
                      />
                      <label htmlFor="floatingValue">Job:</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={residenceHandler}
                        className="form-control"
                        type="text"
                        id="floatingValue"
                        value={residence}
                      />
                      <label htmlFor="floatingValue">Residence:</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating">
                  <input
                    onChange={imgHandler}
                    className="form-control"
                    type="text"
                    id="floatingValue"
                    value={img}
                  />
                  <label htmlFor="floatingValue">Image:</label>
                </div>
                <button
                  onClick={updateHandler}
                  type="button"
                  className="btn btn-update"
                >
                  <i className="fas fa-pen-square"></i>Update
                </button>
                <button
                  onClick={deleteHandler}
                  type="button"
                  className="btn btn-delete"
                >
                  <i className="fas fa-trash"></i>Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-icon"><CircularProgress /></div>
      )}
    </div>
  );
};

export default SearchDetails;
