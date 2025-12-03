import React, { useEffect, useState } from "react";

export default function UserDetails() {

    const [users,setUsers] = useState([]);
     const baseUrl = import.meta.env.VITE_BASE_URL

    useEffect(()=>{

        const fetchUsers = async()=>{

            const response = await fetch(`${baseUrl}/admin/UserDetails`,{
                method:"GET",
                headers:{'Content-Type':'application/json'}
            })

            const result = await response.json();
            if(result.success)
            {
                alert("Data Fetch Successfully")
                setUsers(result.data)
            }
            else
            {
                alert("error fetching data")
            }
        }
        fetchUsers();
    },[])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap gap-6 p-6 justify-start">
      

      {/* User Details Card */}
      {users.map((user,index)=>(
      <div key={index} className="mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-cover text-gray-800">
          <h1 className="text-xl font-bold mb-4 text-center">{user.name}</h1>
          <p><strong>User Type:</strong> {user.usertype}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile No:</strong> {user.mobile}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Password:</strong> {user.password}</p>
          {/* <p><strong>Registered At:</strong> {new Date(user.createdAt).toLocaleString()}</p> */}
        </div>
      </div>
    ))}
    </div>
  );
}
