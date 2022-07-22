import { useState, useEffect } from 'react';
import axios from "axios";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const notifEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/sendAll";

function Create() {
  const [startDate, setStartDate] = useState('');
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({});
  const [immunities, setImmunities] = useState([""]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      setUser(JSON.parse(localStorage.user))
  }, []);

  const submitGame = () => {
      setSuccess(false);
      setError(false);
      axios.post(URL_PREFIX + "/games/create", {
          title: title,
          activePlayers: [],
          eliminatedPlayers: [],
          startDate: startDate,
        //   endDate: endDate + ':00',
          immunities: immunities.length === 1 & immunities[0] === "" ? [] : immunities
      })
      .then((response) => {
          console.log(response);
          resetForm();
          try {
              sendNotification(response.data._id);
              setSuccess(true);
          } catch(err) {
              console.log(err);
          }
      })
      .catch((error) => {
          console.log(error.response);
          setError(true);
      });
  }

  function resetForm() {
    setTitle("");
    setStartDate("");
    setImmunities([""]);
  }

  async function sendNotification(id) {
      const params = {header: "Admin", message: "has created a new game", type: "new game", game: id};

      try {
          const response = await axios.patch(notifEndPoint, params);
          console.log(response);
      } catch (err) {
          console.log(err);
          if (err.response.data.message) {
              console.log(err.response.data.message);
          }
      }
  }

  const handleChangeInput = (i, e) => {
    //console.log(e.target.value);
    const values = [...immunities];
    values[i] = e.target.value;
    setImmunities(values);
  }
  
  
  const handleAdd = (id) => {
    setImmunities([...immunities, ""]);
  }
  
  const handleSubtract = (i) => {
    const values = [...immunities];
    values.splice(i, 1);
    setImmunities(values);
  }

  return (
      <div className="col-4" style={{margin:"auto"}}>
        {success ?
            <div className="alert alert-success mt-3 mb-2 mx-5" style={{margin: "auto"}} role="alert">
                Game was successfully created!
            </div>
        :
            <div></div>
        }   

        {error ?
            <div className="alert alert-danger mt-3 mb-2 mx-5" style={{margin: "auto"}} role="alert">
                An error occurred
            </div>
        :
            <div></div>
        } 

        <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>Create a new game:</h1>
        <p></p>

        <div className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
            <label>Game Title: </label>
            <input className="form-control" value={title}
                type='text'
                onChange={e => {
                    setTitle(e.target.value)
                }}
            />
        </div>

        <div className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
            <label>Start Date: </label>
            <input
                className="form-control"
                value = {startDate}
                type='datetime-local'
                onChange={e => {
                    console.log(typeof(e.target.value))
                    console.log(e.target.value)
                    setStartDate(e.target.value)
                }}
            />
        </div>
        <p></p>
        <h5 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>You may add immunities below:</h5>
        {immunities.map((field, i) => (
        <div key={i} className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
            <label>Immunity {i+1}:</label>
            <input
            className="form-control"
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={field}
            onChange={e => handleChangeInput(i, e)}
            style={{marginLeft:"3px"}}
            />
            <button onClick={() => handleAdd(i)} className="btn btn-outline-success btn-sm" style={{marginLeft:"5px"}}>
            Add
            </button>
            <button disabled={i === 1} onClick={() => handleSubtract(i)} className="btn btn-outline-danger btn-sm" style={{marginLeft:"5px"}}>
            Del
            </button>
        </div>
        ))}

        <p></p>
        <div style={{ margin:"auto", width: "fit-content"}}>
            <button className="btn btn-primary" onClick={submitGame} style={{backgroundColor:"rgb(239, 229, 189)", color:"black"}}>Create Game</button>
        </div>
      </div>
  )
}

export default Create;