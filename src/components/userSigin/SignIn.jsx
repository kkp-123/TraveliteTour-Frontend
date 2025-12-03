import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL
  const [data, setData] = useState({ name: "", mobile: "", email: "", username: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [toast,setToast] = useState(false);

   const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 3000);
};

  const Toast = ({ message, onClose }) => (
  <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50">
    {message}
    <button className="ml-3 text-white text-lg leading-none" onClick={onClose}>
      ✖
    </button>
  </div>
);

  const inputFieldVal = (e) => {

    // console.log(e)
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
    // console.log(data);
  }

  const submitEvent = async (e) => {

    e.preventDefault();
    
    // check field
    if(data.email=="" || data.mobile == "" || data.name=="" || data.username == "" || data.password == "")
    {
      showToast("Please fill all the details");
      return;
    }


    // otp generate

    try {
      const response = await fetch(`${baseUrl}/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          purpose: "Register"
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSendOtp(true);
        showToast("OTP sent to your email!");
        
      }
      else
      {
        showToast(result.message);
      }
    } catch (err) {
      console.error("Error while sending OTP:", err);
      alert(
        "Something went wrong while sending OTP. Please check your internet or server."
      );
    }
  }

    const verifyOtp = async () => {
      // e.preventDefault();
      try {
        const response = await fetch(`${baseUrl}/verifyOtp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email:data.email, otp }),
        });

        const result = await response.json();
        showToast(result.message);

        if(result.success)
        {
          try{
        const response = await fetch(`${baseUrl}/register`,{
          method:"POST",
          headers:{'Content-Type':"application/json",},
          body:JSON.stringify(data)

        })
        const result = await response.json();
        console.log("Response from backend:", result); 
        if(result.success)
        {
          navigate("/Login")
        }
        if(!result.success)
        {
          showToast(result.message)
          
        }
      }
      catch(err){
        console.log("register error",err);
      }
        }


      }
      catch (err) {
        console.log("server error",err);

      }

      


    }

    return (
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen p-6 gap-6">

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}

        {/* Image Section */}
        <div className="bg-white border-2 border-amber-300 rounded-lg overflow-hidden max-w-md w-full">
          <img
            className="w-full h-auto object-cover"
            src="/assets/images/register.png"
            alt="Register Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="bg-yellow-600 rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
          {/* User Icon */}
          <img className="h-20 w-20 mb-4" src="/assets/images/user.png" alt="User Icon" />
          <h1 className="text-2xl text-white mb-5">Register</h1>

          <form className="w-full flex flex-col gap-3 text-black">
            <input type="text" name="name" placeholder="Enter Full Name" className="bg-white px-4 py-2 rounded" required onChange={(k) => inputFieldVal(k)} />
            <input type="tel" name="mobile" placeholder="Enter Mobile Number" className="bg-white px-4 py-2 rounded" required onChange={(k) => inputFieldVal(k)}/>
            <input type="email" name="email" placeholder="Enter Email" className="bg-white px-4 py-2 rounded" required onChange={(k) => inputFieldVal(k)}/>
            <input type="text" name="username" placeholder="Enter Username" className="bg-white px-4 py-2 rounded" required onChange={(k) => inputFieldVal(k)} />
            <input type="password" name="password" placeholder="Enter Password" className="bg-white px-4 py-2 rounded mb-2" required onChange={(k) => inputFieldVal(k)}/>
            {!isSendOtp && (
            <button onClick={submitEvent} type="button" className="bg-slate-950 text-white py-2 rounded-2xl hover:bg-slate-800 transition duration-300">
              Register
            </button>
            )}

             {/* OTP verification */}
        {isSendOtp && (
          <div className=" border-gray-300 pt-4">
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-white px-4 py-2 rounded mb-2 w-full" placeholder="Enter OTP" />
            <button onClick={verifyOtp} type="button" className="w-full bg-slate-950 text-white py-2 rounded-full hover:bg-green-900 hover:cursor-pointer transition">
              Verify Otp
            </button>
          </div>
        )}
          </form>
          <div className="flex flex-row gap-1 justify-end w-full mt-3">
            <p>Already Register?</p>
            <a href="/Login" className="text-white">login in</a>
          </div>
        </div>
      </div>
    );
  }
