//f1c40f - yellow
import { useState, useEffect } from "react";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/accountInfo";

export default function Settings() {
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        try {
          fetchAccountInfo();
        } catch(err) {
          console.log(err);
        }
      }, []);

    async function fetchAccountInfo() {
        const config = {
            headers:{
                authorization: window.localStorage.getItem("token")
            }
        };

        try {
          const response = await axios.get(endPoint, config);
          setUserInfo(response.data);
          console.log(response.data);
          console.log(userInfo);
        } catch(err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <div class="container p-5">
            {!userInfo ? 
            <div> Loading </div>
            :
            <div class="p-3 pb-5" style={{borderRadius: "10px", backgroundColor: "#2A3B4B"}}>
                <h2 class="px-3 mb-1" style={{color: "white"}}>Settings</h2>
                <hr className="mt-0" style={{color: "white"}}></hr>

                <div className="row px-4">
                    {/* Side Tabs */}
                    <div className="col-2 nav flex-column nav-pills" id="pills-tab" role="tablist" aria-orientation="vertical">
                        <button class="nav-link active" id="account-tab" data-bs-toggle="pill" data-bs-target="#pills-account" type="button" role="tab" aria-controls="pills-account" aria-selected="true">Account Details</button>
                        <button class="nav-link" id="profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Password</button>
                        <button class="nav-link" id="messages-tab" data-bs-toggle="pill" data-bs-target="#pills-messages" type="button" role="tab" aria-controls="pills-messages" aria-selected="false">Notifications</button>
                    </div>

                    {/* Tab Content */}
                    <div style={{backgroundColor: "", color: "white"}} class="col tab-content" id="pills-tabContent">
                        {/* Account Details Tab */}
                        <div class="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="account-tab" tabindex="0">
                            <h3 style={{color: "goldenrod"}}>Account Details</h3>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="firstName" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstName" defaultValue={userInfo.firstName}/>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="lastName" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastName" defaultValue={userInfo.lastName}/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="userName" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="userName" defaultValue={userInfo.userName} disabled/>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" defaultValue={userInfo.email}/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="section" class="form-label">Section</label>
                                    <input type="text" class="form-control" id="section" defaultValue={userInfo.section}/>
                                </div>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>

                        {/* Password Tab */}
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="rofile-tab" tabindex="0">
                            <h3 style={{color: "goldenrod", margin: "0px"}}>Password</h3>
                            <p style={{color: "lightgrey", fontSize: "13px"}}>Changing your password can not be undone.</p>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="oldPw" class="form-label">Current password</label>
                                    <input type="password" class="form-control" id="oldPw" placeholder="" disabled/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="newPw" class="form-label">New password</label>
                                    <input type="password" class="form-control" id="newPw" placeholder="" disabled/>
                                </div>
                            </div>
                            <div className="row">
                                <div class="mb-3 col-6">
                                    <label for="confirmNewPw" class="form-label">Confirm password</label>
                                    <input type="password" class="form-control" id="confirmNewPw" placeholder="" disabled/>
                                </div>
                            </div>

                            <button className="col-6 btn btn-primary">Change Password</button>
                        </div>

                        {/* Notifications Tab */}
                        <div class="tab-pane fade" id="pills-messages" role="tabpanel" aria-labelledby="messages-tab" tabindex="0">
                        <h3 style={{color: "goldenrod", margin: "0px"}}>Notifications</h3>
                            <p style={{color: "lightgrey", fontSize: "13px"}}>Adjust your email notification settings</p>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="start" defaultChecked />
                                <label class="form-check-label" for="start">New game has started</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="newImmunity" defaultChecked />
                                <label class="form-check-label" for="newImmunity">New immunity</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="confirmElim" defaultChecked/>
                                <label class="form-check-label" for="confirmElim">Confirm elimination</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}