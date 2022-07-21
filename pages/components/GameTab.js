import axios from "axios";

import FriendModal from "./FriendModal";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/deleteFriend";

export default function GameTab(props) {

    async function deleteFriend(userName) {
        try {
            const response = await axios.patch(endPoint, {friend: userName});
            props.setFriends(response.data);
        } catch(err) {
            console.log(err.response);
        }
    }

    return (
        <div className="tab-pane fade" id="pills-game" role="tabpanel" aria-labelledby="game-tab" tabindex="3" >
            <h3 style={{ color: "goldenrod" }}>Close Friends</h3>
            
            <p style={{ color: "lightgrey", fontSize: "13px" }}>
                Add people you frequently interact with as close friends. Close friends 
                will not receive each other as targets in the first few rounds of the game.
            </p>

            <div className="row">
                {props.friends.map((friend) => (
                    <div key={friend.userName} className="col-2 m-1 text-center" style={{border: "solid 1px #9394AD"}}>
                        <div style={{margin: "auto", width: "fit-content"}}>
                            <i className="bi bi-person-circle" style={{fontSize: "60px"}}></i>
                        </div>
                        <p className="my-0" style={{color: "#F1C40F"}}>{friend.firstName} {friend.lastName}</p>
                        <p className="mb-0" style={{fontSize: "13px"}}>{friend.userName}</p>
                        <button onClick={()=>deleteFriend(friend.userName)} className="btn btn-sm btn-danger my-1">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: "center" }}>
                <FriendModal userName={props.userName} friends={props.friends} setFriends={props.setFriends} />
            </div>

        </div>
    )
}