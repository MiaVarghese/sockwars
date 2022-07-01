export default function NotificationsTab(props) {
  return (
    <div
    class="tab-pane fade"
    id="pills-messages"
    role="tabpanel"
    aria-labelledby="messages-tab"
    tabindex="0"
  >
    <h3 style={{ color: "goldenrod", margin: "0px" }}>
      Notifications
    </h3>
    <p style={{ color: "lightgrey", fontSize: "13px" }}>
      Adjust your email notification settings
    </p>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="start"
        defaultChecked
      />
      <label class="form-check-label" for="start">
        New game has started
      </label>
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="newImmunity"
        defaultChecked
      />
      <label class="form-check-label" for="newImmunity">
        New immunity
      </label>
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="confirmElim"
        defaultChecked
      />
      <label class="form-check-label" for="confirmElim">
        Confirm elimination
      </label>
    </div>
  </div>
  )
}