import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "react-dotenv";

const CreateCharacter = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState("");
  const [alignment, setAlignment] = useState("");
  const [residence, setResidence] = useState("");
  const [job, setJob] = useState("");
  const [img, setImg] = useState("");

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

  const createHandler = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error("ERROR: Name cannot be empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post(`${env.API_URL}/characters`, {
          name: name,
          race: race,
          level: level,
          alignment: alignment,
          job: job,
          residence: residence,
          img: img,
        })
        .then((res) => {
          console.log("Submit successful!");
          history.push("/");
        });
    }
  };
  return (
    <div className="character-details">
      <div className="character-info">
        <div className="row">
          <div className="col-5">
            <img
              src={img}
              className="character-info-img"
              alt="Character Profile"
            ></img>
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
              <button onClick={createHandler} className="btn btn-create">
                <i className="fas fa-plus-square"></i>Create
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreateCharacter;
