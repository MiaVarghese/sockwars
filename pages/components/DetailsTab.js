export default function DetailsTab(props) {
  return (
    <div
    class="tab-pane fade show active"
    id="pills-account"
    role="tabpanel"
    aria-labelledby="account-tab"
    tabindex="0"
  >
    <h3 style={{ color: "goldenrod" }}>Account Details</h3>
    <div className="row">
      <div class="mb-3 col-sm-6">
        <label for="firstName" class="form-label">
          First name
        </label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          defaultValue={userInfo.firstName}
          onChange={handleOnChange}
        />
      </div>
      <div class="mb-3 col-sm-6">
        <label for="lastName" class="form-label">
          Last name
        </label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          defaultValue={userInfo.lastName}
          onChange={handleOnChange}
        />
      </div>
    </div>
    <div className="row">
      <div class="mb-3 col-sm-6">
        <label for="userName" class="form-label">
          Username
        </label>
        <input
          type="text"
          class="form-control"
          id="userName"
          defaultValue={userInfo.userName}
          disabled
          onChange={handleOnChange}
        />
      </div>
      <div class="mb-3 col-sm-6">
        <label for="email" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          id="email"
          defaultValue={userInfo.email}
          onChange={handleOnChange}
        />
      </div>
    </div>
    <div className="row">
      <div class="mb-3 col-sm-6">
        <label for="section" class="form-label">
          Section
        </label>
        <input
          type="text"
          class="form-control"
          id="section"
          defaultValue={userInfo.section}
          onChange={handleOnChange}
        />
      </div>
    </div>
    <div style={{ textAlign: "center" }}>
      <button
        className="btn btn-primary"
        onClick={updateAccountInfo}
      >
        Save Changes
      </button>
    </div>
  </div>
  )
}