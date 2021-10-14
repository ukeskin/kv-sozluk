import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isAuthenticated ? (
        <DashboardContent user={user} />
      ) : (
        <div className="flex flex-col bg-gray-100 p-16 rounded gap-8">
          <p className="text-lg">Please log in for content managent</p>
          <LoginButton />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export function DashboardContent() {
  const [data, setData] = useState([]);
  const FetchData = () => {
    fetch("https://express-monk-starter.vercel.app/api/emojis")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      terim_tr: formData.get("terim_tr"),
      terim_en: formData.get("terim_en"),
      explaination_tr: formData.get("explaination_tr"),
      explaination_en: formData.get("explaination_en"),
    };
    fetch("https://express-monk-starter.vercel.app/api/emojis", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(FetchData);
    event.target.reset();
    toast.info("Added ✅", {
      position: "top-center",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDelete = (id) => {
    fetch(`https://express-monk-starter.vercel.app/api/emojis/${id}`, {
      method: "DELETE",
    }).then(FetchData);
    toast.warning("Deleted !", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="container mx-auto flex flex-col gap-24 mt-16 px-4 md:px-0 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-8">
          <div>
            <label className="text-gray-700 text-sm mb-2">
              Kelime İngilizce
            </label>
            <input
              required
              name="terim_tr"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm mb-2">Kelime Türkçe</label>
            <input
              required
              name="terim_en"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm mb-2">
              Kelime Türkçe Açıklama
            </label>
            <textarea
              name="explaination_tr"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm mb-2">
              Kelime İngilizce Açıklama
            </label>
            <textarea
              name="explaination_en"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="textarea"
            />
          </div>
          <button
            className="bg-yellow-400 text-lg text-white px-4 py-2 rounded"
            type="submit"
          >
            Ekle
          </button>
        </div>
      </form>

      <table class="min-w-full border-collapse block md:table">
        <thead class="block md:table-header-group">
          <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th class="bg-yellow-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Kelime Türkçe
            </th>
            <th class="bg-yellow-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Kelime İngilizce
            </th>
            <th class="bg-yellow-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Kelime Türkçe Açıklama
            </th>
            <th class="bg-yellow-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Kelime İngilizce Açıklama
            </th>
            <th class="bg-yellow-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          </tr>
        </thead>
        <tbody class="block md:table-row-group">
          {data.map((item) => (
            <tr class="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span class="inline-block w-1/3 md:hidden font-bold">
                  Kelime Türkçe
                </span>
                {item.terim_tr}
              </td>
              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span class="inline-block w-1/3 md:hidden "></span>
                {item.terim_en}
              </td>
              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span class="inline-block w-1/3 md:hidden font-bold"></span>
                {item.explaination_tr}
              </td>
              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span class="inline-block w-1/3 md:hidden font-bold">
                  Mobile
                </span>
                {item.explaination_en}
              </td>
              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span class="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
