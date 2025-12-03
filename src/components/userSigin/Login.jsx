import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [toast,setToast] = useState(null);

    

    const [userdata, setUserdata] = useState({
        username: "",
        password: "",
        usertype: "",
    });
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

    const inputHandle = (e) => {
        const { name, value } = e.target;

        setUserdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userdata),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem(
                    "logindetails",
                    JSON.stringify({
                        isLogin: true,
                        username: result.usersData.username,
                        userType: result.usersData.usertype,
                        name:result.usersData.name,
                        userid:result.usersData._id
                    })
                );

                alert("You successfully logged in");

                if (result.usersData.usertype === "user") {
                    navigate("/Package");
                } else if (result.usersData.usertype === "admin") {
                    navigate("/admin/adminHome");
                }
            } else {
                // alert("Please enter correct details");
                showToast("please enter correct details");

                // CLEAR FORM FULLY
                setUserdata({
                    username: "",
                    password: "",
                    usertype: "",
                });
            }
        } catch (err) {
            console.log("login error", err);
        }
    };

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen p-6 gap-6">

             {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            <div className="bg-white border-2 border-amber-300 rounded-lg overflow-hidden">
                <img className="w-full max-w-md h-auto" src="/assets/images/login.png" alt="Login Illustration" />
            </div>

            <div className="rounded-2xl bg-yellow-600 w-full max-w-md p-8 flex flex-col items-center">
                <img className="h-20 w-20 mb-4" src="/assets/images/user.png" alt="User Icon" />
                <h1 className="text-3xl text-white mb-5">Login</h1>

                <form className="text-black w-full flex flex-col items-center" onSubmit={submitEvent}>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={userdata.username}
                        className="bg-white mt-3 px-3 py-2 w-full rounded"
                        placeholder="Enter Username"
                        onChange={inputHandle}
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={userdata.password}
                        className="bg-white mt-3 px-3 py-2 w-full rounded mb-4"
                        placeholder="Enter Password"
                        onChange={inputHandle}
                    />

                    <select
                        name="usertype"
                        value={userdata.usertype}
                        className="bg-white mt-0 px-3 py-2 w-full rounded mb-4"
                        onChange={inputHandle}
                    >
                        <option value="">Select User Type</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-slate-950 w-full text-white py-2 rounded-2xl hover:bg-slate-800 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="flex flex-row gap-1 justify-end w-full mt-3">
                    <a href="/ForgotPassword" className="text-white border-b-1">ForgotPassword</a>
                </div>
                <div className="flex flex-row gap-1 justify-end w-full mt-3">
        <p>Don't have an account?</p>
        <a href="/SignIn" className="text-white">Register</a>
        </div>
            </div>
        </div>
    );
}
