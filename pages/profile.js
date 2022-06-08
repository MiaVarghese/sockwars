import styles from '../styles/profile.module.css'
import NavBar from "./components/NavBar";

export default function Profile() {
    return (
        <div>
            <NavBar />
            <div class="container d-flex justify-content-center align-items-center" style={{paddingTop:"25px"}}>
                <div class="card" style={{backgroundColor: "rgb(239, 229, 189)"}}>
                    <div class="upper">
                        <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid"/>
                    </div>
                    <span class="text-muted d-block mb-2 text-center">Status: IMMUNE</span>
                    <div class="user text-center">
                        <div class="profile" style={{paddingTop:"10px"}}>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle" width="80"/>
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <h4 class="mb-0">John Doe</h4>
                        <span class="text-muted d-block mb-2">4th Year</span>
                        <button class="btn btn-primary btn-sm follow">Edit Profile</button>
                        <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                            <div class="stats">
                                <h6 class="mb-0">Tagged</h6>
                                <span>8</span>
                            </div>
                            <div class="stats">
                                <h6 class="mb-0">Tagged by</h6>
                                <span>N/A</span>
                            </div>
                            <div class="stats">
                                <h6 class="mb-0">Rank</h6>
                                <span>12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}