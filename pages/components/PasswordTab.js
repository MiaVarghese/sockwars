export default function PasswordTab(props) {

    return (
        <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="rofile-tab"
        tabindex="0"
      >
        <h3 style={{ color: "goldenrod", margin: "0px" }}>Password</h3>
        <p style={{ color: "lightgrey", fontSize: "13px" }}>
          Changing your password can not be undone.
        </p>
        <div className="row">
          <div class="mb-3 col-sm-6">
            <label for="oldPw" class="form-label">
              Current password
            </label>
            <input
              type="password"
              class="form-control"
              id="oldPw"
              placeholder=""
              onChange={handleOnChangePassword}
            />
          </div>
        </div>
        <div className="row">
          <div class="mb-3 col-sm-6">
            <label for="newPw" class="form-label">
              New password
            </label>
            <input
              type="password"
              class="form-control"
              id="newPw"
              placeholder=""
              onChange={handleOnChangePassword}
            />
          </div>
        </div>
        <div className="row">
          <div class="mb-3 col-sm-6">
            <label for="confirmNewPw" class="form-label">
              Confirm password
            </label>
            <input
              type="password"
              class="form-control"
              id="confirmNewPw"
              placeholder=""
              onChange={handleOnChangePassword}
            />
          </div>
        </div>

        <div className="row">
          <div class="mb-3 col-sm-6">
            {passwordError || passwordSuccess ? (
              <div
                className={`alert alert-${
                  passwordError ? "danger" : "success"
                } m-1`}
                role="alert"
              >
                {passwordError || passwordSuccess}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <button
          className="col-sm-6 btn btn-primary"
          onClick={updatePassword}
        >
          Change Password
        </button>
      </div>
    )
}