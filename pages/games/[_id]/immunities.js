import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from "axios";

import styles from '../../../styles/App.module.css'

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const createEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/assignTarget";
const notifEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/sendAll";

function addImmunity() {
    const [allUsers, setUsers] = useState([])
    const [immunity, setImmunity] = useState('')
    const [user, setUser] = useState({})

    const router = useRouter();
    const { _id } = router.query;

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

    const submitImmunity = () => {
        axios.patch(URL_PREFIX + "/games/addImmunity", {
            _id: _id,
            immunity: immunity
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error.response)
        });
        //console.log(immunity)
    }

    async function sendNotification(id) { //Keep in case we want notification for new immunity
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

    const immunityTextHandler = (event) => {
        setImmunity(event.target.value)
    }

    return (
        <>
        {user != null && user.role === "admin" && (
            <>
            <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>Create immunity:</h1>
            <p></p>
            <div style={{ margin:"auto", color:"rgb(239, 229, 189)", width: "500px"}} class="form-group">
                <label for="immunity">Immunity</label>
                <textarea class="form-control" id="immunity" rows="3" onChange={immunityTextHandler}></textarea>
            </div>
            <p></p>
            <div style={{ margin:"auto", width: "fit-content"}}>
                <button className="btn btn-primary" onClick={submitImmunity} style={{backgroundColor:"rgb(239, 229, 189)", color:"black"}}>Add</button>
            </div>
            <hr />
            {/* {comments.map(comment => {
                return (
                <div key={comment.id}>
                    {comment.id}. {comment.text}
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                </div>
                )
            })} */}
            </>
        )}
        {user != null && user.role === "user" && (
            <div>
                <h2 style={{textAlign: "center", color: "rgb(241, 196, 15)"}}>You are not authorized to access this page</h2>
            </div>
        )}
        </>
    )
}

export default addImmunity