import React from "react";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const Profile = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 flex justify-center items-start h-full">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8 md:h-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              user?.photo ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${
                user?.name || "User"
              }`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-400">@username</p>
          {user?.email && (
            <p className="text-gray-500 text-sm mb-2">{user.email}</p>
          )}
          <span className="text-xs text-white bg-primary px-3 py-1 rounded-full mb-6">
            Logged in via {user?.method || "Local"}
          </span>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-300 hover:bg-red-400 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
