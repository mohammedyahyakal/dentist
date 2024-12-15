import { NavLink } from "react-router-dom";
import c from "./Br.module.css";

function Bar() {
  return (
    <div className={c.bar}>
      <ul>
        <li>
          <NavLink to={"/patients"}>المرضى </NavLink>
        </li>
        <li>
          <NavLink to="grre">coaches 💪</NavLink>
        </li>
        <li>
          <NavLink to="grre">coaches 💪</NavLink>
        </li>
        <li>
          <NavLink to="grre">coaches 💪</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Bar;
