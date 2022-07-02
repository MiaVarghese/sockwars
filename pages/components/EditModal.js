export default function EditModal(props) {
    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Game</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div className="row">
                            <div className="col-6">
                                <label for="startDate" class="form-label">Start Date</label>
                                <input type="date" className="form-control" id="startDate" 
                                    value={props.data ? props.data.startDate : ""}
                                    onChange={(e) => props.data.handleChange(e, 'shortStartDate')}
                                />
                            </div>
                            <div className="col-6">
                                <label for="endDate" class="form-label">End Date</label>
                                <input type="date" className="form-control" id="endDate" 
                                    value={props.data ? props.data.endDate : ""}
                                    onChange={(e) => props.data.handleChange(e, 'shortEndDate')}
                                />
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