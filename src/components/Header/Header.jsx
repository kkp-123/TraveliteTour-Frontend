import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [isopen, setisopen] = useState(false);
    const loginData = JSON.parse(localStorage.getItem("logindetails")) || {};
    const [name, setName] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL

    const handleLogout = () => {
        localStorage.removeItem("logindetails");
        navigate('/login')
    }

    useEffect(() => {
        if (loginData) {
            async function fetchUser() {
                const response = await fetch(`${baseUrl}/userdetails`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData)
                    })

                const result = await response.json();
                if (result.success) {

                    setName(result.data.response.name)
                }
            }
            fetchUser();
        }
    }, [loginData])

    return (
        <>
            <header className="w-full h-14 items-center bg-yellow-600 justify-between flex p-5">
                <div className="text-white text-3xl">TravelLite</div>
                <ul className="md:flex space-x-5 font-semibold hidden" >
                    <li><a href={loginData?.userType == "admin" ? "/admin/adminHome" : "/"}>Home</a></li>
                    <li><a href="/About">About us</a></li>
                    <li><a href="/Package">Packages</a></li>
                    {loginData?.userType === "user" && 
                    <li><a href="/UserBookingDetails">Your Bookings</a></li>
                    }

                </ul>
                {!loginData.isLogin ? (<>
                    <ul className="md:flex space-x-5 font-semibold hidden items-center ">
                        <li><a href="/Login">login</a></li>
                        <li className="bg-white border-0 rounded-2xl px-2 py-1 text-orange-400"><a href="/SignIn">Register</a></li>
                    </ul>

                </>)
                    : (<>
                        <div className="flex flex-row gap-6">
                            <h2 className="text-black font-semibold text-xl" >Hello {name}</h2>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-yellow-600 font-semibold px-3 py-1 rounded-2xl hidden md:block"
                            >
                                Logout
                            </button>
                        </div>
                    </>)}

                <div className="md:hidden">
                    <button className="text-4xl" id="togle" onClick={() => setisopen(!isopen)}>&#8801;</button>
                </div>




            </header>
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out px-6 
  backdrop-blur-md bg-yellow-600 font-bold 
  ${isopen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <ul className="flex flex-col space-y-2 mt-4 font-semibold text-white">
                    <li><a href="/">Home</a></li>
                    <li><a href="/About">About us</a></li>
                    <li><a href="/Package">Packages</a></li>
                    <li><a href="/UserBookingDetails">Your Bookings</a></li>
                    {!loginData.isLogin ? (<>
                        <li><a href="/SignIn">Register</a></li>
                        <li><a href="/Login">login</a></li>
                    </>) : (<>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </>)}

                </ul>
            </div>
        </>
    )
}