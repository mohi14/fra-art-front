import { Link, useLocation } from "react-router-dom";

function SettingsMenu() {
  const location = useLocation();

  return (
    <>
      <ul className="settings-menu">
        <li className={location == "/admin/settings-profile" ? "active" : ""}>
          <Link to="/admin/settings-profile">
            <span>Profile</span>
          </Link>
        </li>
        {/* <li className={location == "/admin/settings-application" ? "active" : ""}>
          <Link to="/admin/settings-application">
            <span>Application</span>
          </Link>
        </li> */}
        {/* <li className={location == "/admin/settings-security" ? "active" : ""}>
          <Link to="/admin/settings-security">
            <span>Security</span>
          </Link>
        </li>
        <li className={location == "/admin/settings-activity" ? "active" : ""}>
          <Link to="/admin/settings-activity">
            <span>Activity</span>
          </Link>
        </li> */}
        {/* <li className={location == "/admin/settings-payment-method" ? "active" : ""}>
          <Link to="/admin/settings-payment-method">
            <span>Payment Method</span>
          </Link>
        </li> */}
        {/* <li className={location == "/admin/settings-api" ? "active" : ""}>
          <Link to="/admin/settings-api">
            <span>API</span>
          </Link>
        </li> */}
      </ul>
    </>
  );
}
export default SettingsMenu;
