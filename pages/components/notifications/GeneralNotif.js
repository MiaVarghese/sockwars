import styles from '../../../styles/notifications.module.css';
import Link from "next/link";

export default function GeneralNotif(props) {

    function getIcon() {
        var icon = "bi bi-";

        switch(props.type) {
            case "immunity":
                icon += "bandaid";
                break;
            case "new game":
                icon += "joystick";
                break;
            case "target":
                icon += "person-circle";
                break;
            default:
                break;
        }

        return icon;
    }

    return (
        <li key={props.id} className="list-group-item" style={{background: "none", color: "white", border: "none"}}>
            {console.log(props)}
            <div className="row">
                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                    <i className={getIcon()} style={{fontSize: "45px", color: "white"}}></i>
                </div>
                <div className="col">
                    <span style={{color: "goldenrod"}}>{props.header}</span> 
                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                    <br/>
                    <span>{props.message}</span> <br/>
                    <button className={styles.confirmBtn}>
                    <Link href={"./games/" + props.gameId}>
                        View
                    </Link>
                    </button>
                    <span className={styles.timeStamp}>{props.time}</span>
                </div>
            </div>
        </li>
    );
}