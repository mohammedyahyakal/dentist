import c from "./Header.module.css";
function Header() {
  return (
    <header>
      <h1>dentist</h1>
      <div className={c.uer}>
        <p>admin</p>
        <img src="../../imgz/1.png" alt="" />
      </div>
    </header>
  );
}

export default Header;
