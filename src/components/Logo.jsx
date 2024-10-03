import styles from "./Logo.module.css";
import { NavLink } from "react-router-dom";
function Logo() {
  return (
    <NavLink to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </NavLink>
  );
}

export default Logo;
