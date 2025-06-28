import { useEffect, useState } from "react";
interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 ">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        Users
      </h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition"
          >
            <div className="flex w-full items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}`}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{user.email}</p>
                <p className="text-sm text-gray-700">
                  📍 {user.address.city}, {user.address.street}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
