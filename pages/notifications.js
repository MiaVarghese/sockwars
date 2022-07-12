import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Notification from "./components/Notification";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/accountInfo";

export default function Notifications() {
    const [notifs, setNotifs] = useState();
    const [numNotifs, setNumNotifs] = useState();

    const router = useRouter();
    const { page } = router.query;

    useEffect(() => {
        try {
          fetchNotifications();
        } catch (err) {
          console.log(err);
        }
      }, [page]);
    
    async function fetchNotifications() {
      try {
        var start;
        var end;

        const response = await axios.get(endPoint);
        setNumNotifs(response.data.notifications.length);

        if (page) {
          start = (page-1)*10;
          end = Math.min(page*10, response.data.notifications.length);
        } else {
          start = 0;
          end = Math.min(10, response.data.notifications.length);
        }

        setNotifs(response.data.notifications.reverse().slice(start, end));
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
        }
      }
    }

    return (
        <div className="container p-5">
            {!notifs ? 
            <Spinner/>
            :
            <div className="mx-5 p-3 pb-5" style={{borderRadius: "10px"}}>
                <h2 style={{color: "white"}}>Notifications</h2>

                <div className="mb-2">
                    <ul className="list-group list-group-flush">
                        {notifs.map((notif) => (
                            <Notification key={notif._id} type={notif.type} header={notif.header} message={notif.message} time={notif.timeStamp} gameId={notif.gameId} id={notif._id} />
                        ))}

                        {notifs.length===0 ?
                          <div style={{color: "white", margin: "auto"}}>No notifications</div>
                          :
                          <div></div>
                        }
                        
                        {/* <Notification type="immunity" header="Immunity" message="New immunity, [immunity], is in effect" />
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <Notification type="target" header="Target" message="Your new target is ready" />
                        <hr className="m-0" style={{color: "lightgrey"}}></hr> */}
                    </ul>
                </div>
                <Pagination numNotifs={numNotifs} perPage={10} page={page} />
            </div>
            }
    </div>
    );
}