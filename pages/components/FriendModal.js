import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/search?key=";
const addEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/addFriend";

export default function FriendModal(props) {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [names, setNames] = useState([]);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const filter = props.friends.map((friend) => {
            return friend.userName;
        });
        setNames(filter);
    }, [props.friends]);

    async function searchUsers(e) {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.get(endPoint + search);
            var filter = response.data.filter(function(res) {
                return names.indexOf(res.userName)===-1 && res.userName!==props.userName;
            });
            setResults(filter);
            setPage(1);
            setItems(filter.slice(0, Math.min(9, filter.length)));
            setLoading(false);
        } catch(err) {
            console.log(err.response);
            setLoading(false);
        }
    }

    async function addFriend(userName) {
        try {
            const response = await axios.patch(addEndPoint, {friend: userName});
        } catch(err) {
            console.log(err.response);
        }
    }

    function getItems(currPage) {
        setPage(currPage);
        var start = (currPage-1)*9;
        var end = Math.min(currPage*9, results.length);
  
        setItems(results.slice(start, end));
    }

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div style={{color: "black"}}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#friendModal">
                Add
            </button>

            <div className="modal fade" id="friendModal" tabIndex="-1" aria-labelledby="friendModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="friendModalLabel">Add Friends</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        <form onSubmit={(e)=>searchUsers(e)}>
                            <div className="row mx-1 mb-3">
                                <input type="text" className="form-control col" onChange={(e)=>handleChange(e)} placeholder="Enter username..." />
                                <button className="btn btn-primary col-2" type="submit">Search</button>
                            </div>
                        </form>

                        {!loading ?
                            <div>
                                {results.length===0 ?
                                    <div>No matching search results were found</div>
                                :
                                    <div className="row">
                                        {items.map((user) => (
                                            <div key={user.userName} className="col-4">
                                                <i className="bi bi-person-circle mb-0" style={{fontSize: "60px", color: "#9394AD"}}></i>
                                                <p className="mb-1 mt-0">
                                                    
                                                    {user.firstName} {user.lastName} <br/>
                                                    {/* <span style={{color: "gray", fontSize: "14px"}}>{user.userName} <br/></span> */}
                                                    <span style={{color: "gray", fontSize: "14px"}}>{user.section} <br/></span>
                                                </p>
                                                <button onClick={()=>addFriend(user.userName)} className="btn btn-sm btn-primary me-1">+</button>
                                                <button className="btn btn-sm btn-primary">
                                                    <Link href={"./profile/" + user.userName}>
                                                        <i className="bi bi-arrow-right"></i>
                                                    </Link>
                                                </button>
                                            </div>
                                        ))} 
                                        <div className="mt-4 ms-5">
                                            <Pagination getItems={getItems} numItems={results.length} perPage={9} page={page} type="modal" />
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div><Spinner /></div>
                        }

                    

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}