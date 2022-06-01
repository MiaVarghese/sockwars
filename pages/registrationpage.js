import styles from "../styles/registrationpage.module.css";
import image from "./lock.png";
import emailimg from "./email.png";
import usernameimg from "./username.png";

export default function Register() {
  return (
    <div className={styles.box}>
      <h1>Sock War Registration</h1>
      <div className={styles.info}>
        <input
          type="text"
          placeholder="First Name "
          name="firstname"
          size="45"
        />
      </div>

      <div className={styles.info}>
        <input type="text" placeholder="Last Name " name="lastname" size="45" />
      </div>

      <div className={styles.info}>
        <input type="text" placeholder="Username" name="username" size="45" />
      </div>

      <div className={styles.info}>
        <input type="text" placeholder="Email" name="email" size="45" />
      </div>

      <div className={styles.info}>
        <input type="text" placeholder="Password" name="password" size="45" />
      </div>
      <div className={styles.info}>
        <input
          type="text"
          placeholder="Re-enter Password"
          name="reenterpassword"
          size="45"
        />
      </div>
      <div className={styles.info}>
        Gender
        <select name="selectList" id="selectList">
          <option value="" disabled selected hidden>
            Select a gender...
          </option>{" "}
          <option value="option 2">Male</option> {" "}
          <option value="option 3">Female</option>
          <option value="option 4">Other</option>
        </select>
      </div>

      <div className={styles.info}>
        Year
        <select name="selectList" id="selectList">
          <option value="" disabled selected hidden>
            Select a year...
          </option>{" "}
          <option value="First">First </option> {" "}
          <option value="Second">Second </option>
          <option value="Third">Third </option>
          <option value="Fourth">Fourth </option>
          <option value="Other">Other </option>
        </select>
      </div>

      <div className={styles.info}>
        Section
        <select name="selectList" id="selectList">
          <option value="" disabled selected hidden>
            Select a section...
          </option>{" "}
          <option value="option 2">Option 1 </option> {" "}
          <option value="option 3">Option 2 </option>
          <option value="option 4">Option 3 </option>
        </select>
      </div>

      <button type="button">Join!</button>
    </div>
  );
}
