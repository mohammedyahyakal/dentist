import { useState, useEffect } from "react";
import cl from "./Uzerz.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function Patients() {
  const [newch, etNewch] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [kind, setKind] = useState("recent");
  const [blood, setBlood] = useState("o");

  useEffect(() => {
    async function getPatients() {
      const data = await axios.get("http://localhost:8000/patients");

      setPatients(data.data);
    }
    getPatients();
  }, [patients]);
  const filterdpatients =
    filter === "all"
      ? patients
      : patients.filter((ele) => ele.status === filter);

  function hendellAddpetinet(e) {
    e.preventDefault();
    if (name.length < 3 || phone.length !== 10) {
      toast.error("رقم الهاتف يجب ان يتالف من 10 خانات");
      toast.error("اسم المريض يجب ان يتالف من ثلاثة احرف على الاقل");
      return;
    }
    try {
      axios.post("http://localhost:8000/patients", {
        name,
        phone,
        blood,
        booking: "مباشر",
        date: new Date(Date.now()).toLocaleDateString("en-US"),
        status: "waiting",
      });
      toast.success("تم الاضافة بنجاح");

      etNewch(false);
    } catch (e) {
      console.log(e);
    }
  }
  const hendelDelete = (id) => {
    axios.delete(`http://localhost:8000/patients/${id}`);
    toast.success("تم الحدف بنجاح");
  };
  return (
    <div className={cl.cochez}>
      <div>
        <Toaster />
      </div>
      {!newch && (
        <button
          onClick={() => etNewch((prev) => !prev)}
          className={cl.new_choche}
        >
          اضافة مريض
        </button>
      )}
      {newch && (
        <form onSubmit={hendellAddpetinet} className={cl.new_coche_form}>
          <h3>إضافة مريض</h3>
          <div className={cl.continer}>
            <div className={cl.form_control}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required="required"
                type="text"
                placeholder="الاسم..."
              />
              <label htmlFor="nme">الاسم</label>
            </div>
            <div className={cl.form_control}>
              <input
                required="required"
                type="number"
                placeholder="الهاتف..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="email">الهاتف</label>
            </div>
            <div className={cl.select_conteiner}>
              <div>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  name="kind"
                  id="kind"
                >
                  <option value={"recent"}>مسبق</option>
                  <option value={"emergency"}>حالة اسعافية</option>
                  <option value={"direct"}>مباشر</option>
                </select>
                <label htmlFor="kind">:نوع الحجز</label>
                <select
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  name="kind"
                  id="kind"
                >
                  <option value={"O"}>O</option>
                  <option value={"B"}>B</option>
                  <option value={"A"}>A</option>
                  <option value={"AB"}>AB</option>
                </select>
                <label htmlFor="kind">:زمرة الدم</label>
              </div>
            </div>

            <div className={cl.form_control}>
              <button className="btn btn-zmll">إضافة مريض</button>
            </div>
          </div>
        </form>
      )}
      {patients.length && (
        <div className={cl.filter}>
          <button onClick={() => setFilter("all")}>كل المرضى</button>
          <button onClick={() => setFilter("current")}>المريض الحالي</button>
          <button onClick={() => setFilter("comming")}> المرضى القادمون</button>
          <button onClick={() => setFilter("waiting")}>مرضى الانتظار</button>
        </div>
      )}
      <div className={cl.coches}>
        <div className={cl.cocheheader}>
          <span>المريض </span>
          <span>رقم الهاتف </span>
          <span>زمرة الدم</span>
          <span>نوع الحجز</span>
          <span>التاريخ</span>
          <span>الاعدادت </span>
        </div>

        {filterdpatients.map((ele) => (
          <div key={ele.id} className={cl.coche}>
            <div>{ele.name}</div>
            <div>009639{ele.phone}</div>
            <div>{ele.blood}</div>
            <div>
              {ele.status === "waiting"
                ? "انتظار"
                : ele.status === "comming"
                ? "قادم"
                : "حالي"}
            </div>

            <div>{ele.date}</div>
            <div className={cl.icon}>
              <span>
                {/* <IconDelete /> */}
                <i onClick={() => hendelDelete(ele.id)}>🗑</i>
              </span>
              <span>
                {/* <IconGear size={50} /> */}
                <i>
                  <Link to={`patient/edit/${ele.id}`}> 🖌</Link>
                </i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Patients;
