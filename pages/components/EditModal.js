import { useState, useEffect } from "react";

export default function EditModal(props) {
    // const [currTab, setCurrTab] = useState(1); 

    // const onTabClick = (currentTab) => {
    //     setCurrTab(currentTab)
    // }

    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit Game
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Game</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#immunities" aria-controls="immunities" role="tab" data-bs-toggle="tab">Immunities</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#dates" aria-controls="dates" role="tab" data-bs-toggle="tab">Dates</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#players" aria-controls="players" role="tab" data-bs-toggle="tab">Players</a>
                            </li>
                        </ul>
                        {/* <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="home">Home</div>
                            <div role="tabpanel" class="tab-pane" id="dates">Profile</div>
                            <div role="tabpanel" class="tab-pane" id="messages">Messages</div>
                            <div role="tabpanel" class="tab-pane" id="settings">Settings</div>
                        </div> */}
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="immunities">
                                <p></p>
                                <textarea placeholder="Add immunity here" class="form-control" id="immunity" rows="2" ></textarea>
                                <div>
                                    <button className="btn btn-primary btn-sm" style={{marginTop:"5px", float:"right"}}>Add</button>
                                    <div style={{clear:"both"}}></div>
                                </div>
                                <label>Edit/Remove Immunities</label>
                                {props.gameEdit && props.gameEdit.immunities.map((imm, i) => (
                                    <div style={{marginTop:"5px"}}>
                                        <input
                                            type="text"
                                            value={imm}
                                            //onChange={e => handleChangeInput(i, e)}
                                            style={{width:"70%"}}
                                        />
                                        <button className="btn btn-outline-success btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Add
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Del
                                        </button> 
                                    </div>
                                ))}
                            </div>
                            <div role="tabpanel" class="tab-pane" id="dates">
                                <div className="col-7">
                                    <label for="startDate" class="form-label">Start Date</label>
                                    <input type="date" className="form-control" id="startDate" 
                                        //value={props.data ? props.data.startDate : ""}
                                        defaultValue={props.gameEdit ? props.gameEdit.shortStartDate : ""}
                                        onChange={(e) => props.handleChange(e, 'shortStartDate')}
                                    />
                                </div>
                                <div className="col-7">
                                    <label for="endDate" class="form-label">End Date</label>
                                    <input type="date" className="form-control" id="endDate" 
                                        //value={props.data ? props.data.endDate : ""}
                                        defaultValue={props.gameEdit ? props.gameEdit.shortEndDate : ""}
                                        onChange={(e) => props.handleChange(e, 'shortEndDate')}
                                    />
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="players">
                                <p></p>
                                <label>Add user to active players</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Enter username" />
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button">Add</button>
                                    </div>
                                </div>
                                <label>Edit/Remove Active Player</label>
                                {props.gameEdit && props.gameEdit.activePlayers.map((usr, i) => (
                                    <div style={{marginTop:"5px"}}>
                                        <input
                                            type="text"
                                            value={usr.userName}
                                            //onChange={e => handleChangeInput(i, e)}
                                            style={{width:"70%"}}
                                        />
                                        <button className="btn btn-outline-success btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Add
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Del
                                        </button> 
                                    </div>
                                ))}
                                <p></p>
                                <label>Add user to eliminated players</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Enter username" />
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button">Add</button>
                                    </div>
                                </div>
                                <label>Edit/Remove eliminated    Player</label>
                                {props.gameEdit && props.gameEdit.eliminatedPlayers.map((usr, i) => (
                                    <div style={{marginTop:"5px"}}>
                                        <input
                                            type="text"
                                            value={usr.userName}
                                            //onChange={e => handleChangeInput(i, e)}
                                            style={{width:"70%"}}
                                        />
                                        <button className="btn btn-outline-success btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Add
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" style={{marginLeft:"5px", float:"right"}}>
                                            Del
                                        </button> 
                                    </div>
                                ))}
                            </div>
                        </div> 
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}