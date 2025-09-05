import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PETS } from "../api/queries";

function PetList() {
  const { loading, error, data } = useQuery(GET_PETS);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Pet List
        </h2>
        <Link to="/add">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transform transition cursor-pointer">
            + Add New Pet
          </button>
        </Link>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-gray-500 text-center">Loading pets...</p>}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

      {/* Pet Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pets?.map((pet) => (
          <div
            key={pet?.id}
            className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            {/* Badge */}
            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-bold text-white bg-pink-500 rounded-full shadow-md">
              {pet?.type}
            </span>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet?.name}</h3>
            <p className="text-gray-600 mb-4">
              Breed: <span className="font-semibold">{pet?.breed}</span>
            </p>

            <Link to={`/${pet?.id}`}>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transform transition cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && !data?.pets?.length && (
        <p className="text-gray-500 mt-8 text-center text-lg">No pets found. Add a new one!</p>
      )}
    </div>
  );
}

export default PetList;
