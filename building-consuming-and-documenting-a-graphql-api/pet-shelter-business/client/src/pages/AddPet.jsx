import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../api/mutations";

function AddPet() {
  const navigate = useNavigate();

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");

  const [addPet, { loading, error, data }] = useMutation(ADD_PET, {
    variables: {
      petToAdd: {
        name: petName,
        type: petType,
        age: parseInt(petAge),
        breed: petBreed
      }
    }
  });

  useEffect(() => {
    if (data?.addPet?.id) {
      navigate(`/${data.addPet.id}`);
    }
  }, [data, navigate]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500">
          Add Pet
        </h2>
        <Link to="/">
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition">
            ← Back to List
          </button>
        </Link>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-500 text-center">Adding pet...</p>}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

      {/* Form */}
      <div className="space-y-4">
        {["Name", "Type", "Age", "Breed"].map((label, idx) => {
          const state = [petName, petType, petAge, petBreed][idx];
          const setter = [setPetName, setPetType, setPetAge, setPetBreed][idx];
          return (
            <div key={label} className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">Pet {label}</label>
              <input
                type={label === "Age" ? "number" : "text"}
                value={state}
                onChange={(e) => setter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
            </div>
          );
        })}

        <button
          disabled={!petName || !petType || !petAge || !petBreed}
          onClick={() => addPet()}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Add Pet
        </button>
      </div>
    </div>
  );
}

export default AddPet;
