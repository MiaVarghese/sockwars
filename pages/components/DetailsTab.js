export default function DetailsTab({
  userInfo,
  updateAccountInfo,
  handleOnChange,
}) {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-account"
      role="tabpanel"
      aria-labelledby="account-tab"
      tabIndex="0"
    >
      <h3 style={{ color: "goldenrod" }}>Account Details</h3>
      <div className="row">
        <div className="mb-3 col-sm-6">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            defaultValue={userInfo.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            defaultValue={userInfo.lastName}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-sm-6">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            defaultValue={userInfo.userName}
            disabled
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            defaultValue={userInfo.email}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-sm-6">
          <label htmlFor="section" className="form-label">
            Section
          </label>
          <input
            type="text"
            className="form-control"
            id="section"
            defaultValue={userInfo.section}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-primary" onClick={updateAccountInfo}>
          Save Changes
        </button>
      </div>
    </div>
  );
}