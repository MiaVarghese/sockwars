import { useState } from "react";
import axios from "axios";

const endPointPassword =
  process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/changePassword";

export default function PasswordTab(props) {
  const [passwords, setPasswords] = useState();

  const [passwordError, setPasswordError] = useState();
  const [passwordSuccess, setPasswordSuccess] = useState();

  // Handle the input change of passwords and save it in a variable
  const handleOnChangePassword = (e) => {
    e.persist();

    setPasswords((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  async function updatePassword() {
    if (passwords.newPw !== passwords.confirmNewPw) {
      setPasswordError("Confirm password is not the same as the new password.");
      setPasswordSuccess(null);
      return null;
    }

    try {
      const response = await axios.put(endPointPassword, {
        oldPassword: passwords.oldPw,
        newPassword: passwords.newPw,
      });

      setPasswordSuccess("Successfully updated the password!");
      setPasswordError(null);
    } catch (err) {
      setPasswordError(err.response.data.message);
      setPasswordSuccess(null);
    }
  }

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

      <button className="col-sm-6 btn btn-primary" onClick={updatePassword}>
        Change Password
      </button>
    </div>
  );
}