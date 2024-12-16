import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cl from "./UzerzDetil.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function UzerDetil() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [kind, setKind] = useState("recent");
  const [blood, setBlood] = useState("o");
  const [date, setDate] = useState("2024-12-1");
  const [status, setstatus] = useState("comming");
  const param = useParams();
  const nev = useNavigate();
  useEffect(() => {
    async function getPatients() {
      const data = await axios.get(
        "http://localhost:8000/patients/" + param.id
      );

      setName(data.data.name);
      setPhone(data.data.phone);
      setBlood(data.data.blood);
    }
    getPatients();
  }, [param.id]);
  useEffect(() => {
    async function getPatients() {
      const data = await axios.get("http://localhost:8000/patients");

      setPatients(data.data);
    }
    getPatients();
  }, []);

  const current = patients.filter((ele) => ele.status === "current");
  function hendelCurrent() {
    try {
      axios.patch("http://localhost:8000/patients/" + param.id, {
        status: "current",
      });
      toast.success("تم نقل المريض الى قم المرضى الحايين");
    } catch (e) {
      console.log(e);
    }
  }
  function hendellAddpetinet(e) {
    e.preventDefault();
    if (
      name.length < 3 ||
      phone.length !== 10 ||
      new Date(date).getTime() <
        new Date(Date.now()).getTime() - 1000 * 60 * 60 * 24
    ) {
      if (phone.length !== 10) {
        toast.error("رقم الهاتف يجب ان يتالف من 10 خانات");
      }
      if (name.length < 3) {
        toast.error("اسم المريض يجب ان يتالف من ثلاثة احرف على الاقل");
      }
      if (
        new Date(date).getTime() <
        new Date(Date.now()).getTime() - 1000 * 60 * 60 * 24
      ) {
        toast.error("يرجى ادخال تاريخ صحيح");
      }
      return;
    }
    try {
      axios.patch("http://localhost:8000/patients/" + param.id, {
        name,
        phone,
        blood,
        booking: "مباشر",
        date: new Date(date).toLocaleDateString("en-US"),
        status: status,
      });
      toast.success("تم التعديل بنجاح");
    } catch (e) {
      toast.error("هناك خطاء ما");
    }
  }
  console.log(current);
  return (
    <div className={cl.cochez}>
      <div>
        <Toaster />
      </div>
      <form onSubmit={hendellAddpetinet} className={cl.new_coche_form}>
        <h3>تعديل بيانات المريض</h3>
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
          <div className={cl.select_conteiner}>
            <div>
              <select
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                name="kind"
                id="kind"
              >
                <option value={"comming"}>قادم</option>
                <option value={"waiting"}>انتظار</option>
              </select>
            </div>
          </div>
          <div className={cl.form_control}>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
          <div className={cl.form_control}>
            <button className="btn btn-zmll">حفظ</button>
          </div>
        </div>
      </form>
      {current.length ? (
        <p className="centertext">
          لا يمكن تحويل المريض الى قسم المرضى الحاليين بسبب وجود مريض حالي
        </p>
      ) : (
        <button className="btn" onClick={hendelCurrent}>
          نقل المريض الى قسم المرضى الحاليين
        </button>
      )}
      <button onClick={() => nev("/")} className="btn">
        الخلف
      </button>
    </div>
  );
}

export default UzerDetil;
