import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
const rest_api_url = "https://kv-sozluk-api.vercel.app/api/terims";
function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);

  console.log(data);
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = data.filter((item) => {
      return (
        item.terim_en.toLowerCase().includes(value) ||
        item.terim_tr.toLowerCase().includes(value)
      );
    });
    setFilteredData(result);
  };
  const fetchData = async () => {
    axios(rest_api_url).then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="font-sans container mx-auto">
        <div className="w-full mt-16">
          <div
            className="flex-col p-4 text-center w-full h-48"
            aria-label="arama kutusuna yazarak arama yapın"
          >
            <h1 className="text-5xl font-serif text-yellow-400">
              Karşılaştırmalı Kişisel Veri Sözlüğü
              <img
                className="w-12 inline ml-2"
                src={window.location.origin + "/images/turkey.svg"}
                alt="Türkiye bayrağı"
              />
              <img
                className="w-12 inline ml-2"
                src={window.location.origin + "/images/europe.svg"}
                alt="Avrupa birliği bayrağı"
              />
            </h1>
            <input
              className="text-center text-lg h-1/4 py-8 mt-20 rounded-md w-full md:w-3/4 border-2 border-yellow-200 hover:border-yellow-400"
              type="text"
              placeholder="Ara.."
              onChange={(event) => handleSearch(event)}
            />
            <p className="mt-4 font-medium text-gray-600">
              {filteredData.length} Sonuç listeleniyor
            </p>
          </div>
        </div>
        <div
          aria-label="Sonuçlar listeleniyor"
          className="p-6 mt-24 rounded-md"
        >
          {filteredData.map((data, index) => {
            return (
              <div
                className="rounded-lg shadow text-indigo-800 space-y-5 p-4 mt-8 border-l-4 border-yellow-500 hover:border-yellow-300 transition delay-75"
                key={index}
              >
                <div className="space-y-2">
                  <h2 className="font-medium text-xl">
                    <span className="rounded text-white bg-red-500 p-1 text-xs text-center mr-2">
                      TR
                    </span>
                    {data.terim_tr}
                  </h2>
                  <h2 className="font-medium text-xl">
                    <span className="rounded text-white bg-red-500 p-1 text-xs text-center mr-2">
                      EN
                    </span>
                    {data.terim_en}
                  </h2>
                </div>
                <div className="space-y-4 rounded bg-yellow- p-2 text-indigo-900 divide-y divide-yellow-200">
                  <p className="text-lg">{data.explaination_tr}</p>
                  <p className="text-lg pt-2">{data.explaination_en}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
