import { useState, useEffect } from 'react';
import axios from "axios";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const createEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/assignTarget";
const notifEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/sendAll";

function Create() {
  const [allUsers, setUsers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState();
  const [user, setUser] = useState({});
  const [immunities, setImmunities] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fields, setFields] = useState([{
    id: 1,
    firstName: "",
    lastName: ""
  }]);

  useEffect(() => {
      /*axios.get(URL_PREFIX + "/users").then((response) => {
          let users = []
          for(let i = 0; i < response.data.length; i++) {
              users.push({
                  id: response.data[i]._id,
                  userName: response.data[i].userName,
                  section: response.data[i].section,
              })
          }
          setUsers(users)
      })*/
      setUser(JSON.parse(localStorage.user))
  }, []);

  const submitGame = () => {
      setSuccess(false);
      setError(false);
      axios.post(URL_PREFIX + "/games/create", {
          title: title,
          activePlayers: [],
          eliminatedPlayers: [],
          startDate: startDate + ':00',
          endDate: endDate + ':00',
          immunities: []
      })
      .then((response) => {
          console.log(response);
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
    console.log(e.target.value);
    const values = [...fields]
    values[i][e.target.name] = e.target.value
    setFields(values)
  }
  
  
  const handleAdd = (id) => {
    setFields([...fields, { id: id + 2, firstName: '', lastName: '' }])
  }
  
  const handleSubtract = (i) => {
    const values = [...fields]
    values.splice(i, 1)
    setFields([...values])
  }

  return (
      <div className="col-4" style={{margin:"auto"}}>
      {user != null && user.role === "admin" && (
          <>
            {success ?
                <div className="alert alert-success col-4 mt-3 mb-2" style={{margin: "auto"}} role="alert">
                    Confirmation request was successfully sent to target!
                </div>
            :
                <div></div>
            }   

            {error ?
                <div className="alert alert-danger col-4 mt-3 mb-2" style={{margin: "auto"}} role="alert">
                    An error occurred
                </div>
            :
                <div></div>
            } 

          <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>Create a new game:</h1>
          <p></p>

          <div className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
              <label>Game Title: </label>
              <input className="form-control"
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
                  type='datetime-local'
                  onChange={e => {
                      console.log(typeof(e.target.value))
                      console.log(e.target.value)
                      setStartDate(e.target.value)
                  }}
              />
          </div>
          <p></p>
          <div className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
              <label>End Date: </label>
              <input
                  className="form-control"
                  type='datetime-local'
                  onChange={e => {
                      console.log(typeof(e.target.value))
                      console.log(e.target.value)
                      setEndDate(e.target.value)
                  }}
              />
          </div>
          <p></p>
          <h5 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>You may add immunities below:</h5>
          {fields.map((field, i) => (
            <div key={field.id} className="col-6" style={{ color:"rgb(239, 229, 189)", margin: "auto"}}>
              <label>Immunity {i+1}:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={field.firstName}
                onChange={e => handleChangeInput(i, e)}
                style={{marginLeft:"3px"}}
              />
              <button onClick={() => handleAdd(i)} className="btn btn-outline-success btn-sm" style={{marginLeft:"5px"}}>
                Add
              </button>
              <button disabled={field.id === 1} onClick={() => handleSubtract(i)} className="btn btn-outline-danger btn-sm" style={{marginLeft:"5px"}}>
                Del
              </button>
            </div>
          ))}
          {/* {fields.map(field => 
              <>
              <div className="m-5">
                  <div>{field.id}</div>
                  <div>{field.firstName}</div>
                  <div>{field.lastName}</div>
              </div>
              </>
          )} */}
          <p></p>
          <div style={{ margin:"auto", width: "fit-content"}}>
              <button className="btn btn-primary" onClick={submitGame} style={{backgroundColor:"rgb(239, 229, 189)", color:"black"}}>Create Game</button>
          </div>
          </>
      )} 
      {user != null && user.role === "user" && (
          <div>
              <h2 style={{textAlign: "center", color: "rgb(241, 196, 15)"}}>You are not authorized to access this page</h2>
          </div>
      )}
      </div>
  )
}

export default Create;