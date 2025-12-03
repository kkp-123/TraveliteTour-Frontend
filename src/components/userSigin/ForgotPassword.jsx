import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isSendOtp, setIsSendOtp] = useState(false);
    const navigate = useNavigate();
     const [toast, setToast] = useState(null);


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


    const submitEvent = async (e) => {
        e.preventDefault();

        if (email == "" || username == "" || password == "" || confirmPassword == "") {
            alert("Fill all the details")
        }


        if (password !== confirmPassword) {
            showToast("Password Doesn't match");
            setConfirmPassword("");
            setPassword("");
            return;
        }

        // otp generate

        try {
            const response = await fetch(`${baseUrl}/sendOtp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    purpose: "ForgotPassword"
                }),
            });
            const result = await response.json();
            if (result.success) {
                setIsSendOtp(true);
                showToast("OTP sent to your email!");
            }
        } catch (err) {
            console.error("Error while sending OTP:", err);
            alert(
                "Something went wrong while sending OTP. Please check your internet or server."
            );
        }

    };

    const verifyOtp = async () => {
        // e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/verifyOtp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, otp }),
            });

            const result = await response.json();
            alert(result.message);

            if (result.success) {
                try {
                    const response = await fetch(`${baseUrl}/forgotPassword`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, username: username })
                    })

                    const result = await response.json();
                    if (result.success) {
                        showToast(result.message);
                        navigate("/Login");

                    }
                    else {
                        showToast(result.message);
                        navigate("/ForgotPassword");
                    }

                }
                catch (err) {
                    console.log("error while sending forgot password details: ", err);
                }
            }
            else
            {
                setEmail("");
                setConfirmPassword("");
                setPassword("");
                setUsername("");
                setIsSendOtp(false);
                setOtp("");
            }
        }
        catch (err) {
            console.log("register error", err);
        }
    }

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen p-6 gap-6">
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            {/* Left Side Image */}
            <div className="bg-white border-2 border-amber-300 rounded-lg overflow-hidden">
                <img
                    className="w-full max-w-md h-auto"
                    src="/assets/images/login.png"
                    alt="Forgot Password Illustration"
                />
            </div>

            {/* Right Side Form */}
            <div className="rounded-2xl bg-yellow-600 w-full max-w-md p-8 flex flex-col items-center">
                <img
                    className="h-20 w-20 mb-4"
                    src="/assets/images/user.png"
                    alt="User Icon"
                />
                <h1 className="text-3xl text-white mb-5">Forgot Password</h1>

                <form
                    className="text-black w-full flex flex-col items-center"
                >
                    <input
                        type="email"
                        required
                        value={email}
                        className="bg-white mt-3 px-3 py-2 w-full rounded"
                        placeholder="Enter your registered email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        required
                        value={username}
                        className="bg-white mt-3 px-3 py-2 w-full rounded"
                        placeholder="Enter UserName"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={password}
                        className="bg-white mt-3 px-3 py-2 w-full rounded"
                        placeholder="Enter New Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={confirmPassword}
                        className="bg-white mt-3 px-3 py-2 w-full rounded mb-4"
                        placeholder="Enter Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={submitEvent}
                        className="bg-slate-950 w-full text-white py-2 rounded-2xl hover:bg-slate-800 transition duration-300"
                    >
                        Reset Password
                    </button>
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
                    <p>Remember your password?</p>
                    <a href="/Login" className="text-white">Login</a>
                </div>
            
            </div>

        </div>
    );
}
