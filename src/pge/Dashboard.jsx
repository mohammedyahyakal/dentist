import { Outlet } from "react-router-dom";
import Bar from "../component/Bar";
import Header from "../component/Header";
import c from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={c.home}>
      <Header />
      <Bar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
