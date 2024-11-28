import React, { useState } from "react";

const CrudApp = () => {
  const [data, setData] = useState([]); 
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    country: "",
    gender: "",
    birthday: "",
    phone: "",
  }); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentId, setCurrentId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (isEditing) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === currentId ? { ...item, ...form } : item
        )
      );
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({
      fname: "",
      lname: "",
      username: "",
      password: "",
      country: "",
      gender: "",
      birthday: "",
      phone: "",
    });
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    setForm(item);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">CRUD App</h1>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="First Name"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.fname}
            onChange={(e) => setForm({ ...form, fname: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.lname}
            onChange={(e) => setForm({ ...form, lname: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="USA">USA</option>
            <option value="India">Arabic</option>
          </select>
          <select
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-3 rounded-lg bg-gray-700 text-gray-200"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <button
            type="submit"
            className={`mt-4 md:col-span-2 w-full py-2 rounded-lg ${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>

        {data.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-2">#</th>
                <th className="border border-gray-700 px-4 py-2">First Name</th>
                <th className="border border-gray-700 px-4 py-2">Last Name</th>
                <th className="border border-gray-700 px-4 py-2">Username</th>
                <th className="border border-gray-700 px-4 py-2">Birthday</th>
                <th className="border border-gray-700 px-4 py-2">Country</th>
                <th className="border border-gray-700 px-4 py-2">Phone</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-700 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.fname}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.lname}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.username}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.birthday}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.country}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.phone}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-400">Hozircha ma'lumot yo'q.</p>
        )}
      </div>
    </div>
  );
};

export default CrudApp;
