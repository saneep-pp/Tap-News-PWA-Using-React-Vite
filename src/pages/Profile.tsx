import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutGoogle } from "../firebase"; // Import logout function from firebase.ts

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user?.name && !user?.email) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = async () => {
    try {
      if (user?.method === "google") {
        await logoutGoogle(); // Call Firebase logout for Google users
      } else {
        localStorage.removeItem("user"); // Clear localStorage for local users
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Generate a fallback avatar if no photo or name is available
  const avatarUrl = user?.photo
    ? user.photo
    : `https://api.dicebear.com/7.x/initials/svg?seed=${
        user?.name?.trim() || "Guest"
      }`;

  return (
    <div className="px-4   flex justify-center items-start overflow-hidden h-screen">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8 md:h-full mt-20">
        <div className="flex flex-col items-center text-center">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4 object-cover"
            onError={(e) => {
              // Fallback to a default image if the provided URL fails
              e.currentTarget.src =
                "https://api.dicebear.com/7.x/initials/svg?seed=Guest";
            }}
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-400">
            @{user?.name?.toLowerCase() || "username"}
          </p>
          {user?.email && (
            <p className="text-gray-500 text-sm mb-2">{user.email}</p>
          )}
          <span className="text-xs text-white bg-blue-600 px-3 py-1 rounded-full mb-6">
            Logged in via {user?.method || "Local"}
          </span>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
