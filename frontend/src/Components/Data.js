import { useState, useEffect } from "react";
import axios from "axios";

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDelete=async(id)=>{
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try
    {
        await axios.delete(`http://localhost:5000/api/deleteUser/${id}`)
        setData(data.filter(item=>item._id!==id))
        alert("User deleted");
    }
    catch (error) {
        alert("There was an error deleting the user!", error);
      }
  };

  return (
    <div className="m-12">
      <h1 className="text-3xl font-extrabold text-black tracking-wide uppercase mb-6">
        Devhawks
      </h1>
<h2 className="text-xl font-bold text-black tracking-wide  mb-2">Employees Data</h2>
      <table className="table-fixed border-collapse border border-blue-600 w-full">
        <thead>
          <tr>
            <th className="border-4 border-blue-600 p-4">Name</th>
            <th className="border-4 border-blue-600 p-4">Field</th>
            <th className="border-4 border-blue-600 p-4">Gender</th>
            <th className="border-4 border-blue-600 p-4">Phone Number</th>
            <th className="border-4 border-blue-600 p-4">Email</th>
            <th className="border-4 border-blue-600 p-4">Status</th>
            <th className="border-4 border-blue-600 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border border-blue-600 p-4">
                  {index + 1}. {item.name}
                </td>
                <td className="border border-blue-600 p-4">{item.field}</td>
                <td className="border border-blue-600 p-4">{item.gender}</td>
                <td className="border border-blue-600 p-4">{item.phone}</td>
                <td className="border border-blue-600 p-4">{item.email}</td>
                <td className="border border-blue-600 p-4">{item.status}</td>
                <td className="border border-blue-600 p-4">
                <button
                    onClick={() => handleDelete(item._id)}
                    className="  px-4 py-2 rounded hover:bg-red-600"
                  >
                   🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-blue-600 p-6 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
