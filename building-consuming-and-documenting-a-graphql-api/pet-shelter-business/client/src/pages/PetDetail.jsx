import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PET } from "../api/queries";
import { DELETE_PET } from "../api/mutations";

function PetDetail({ setPetToEdit }) {
  const { petId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PET, { variables: { petId } });
  const [deletePet, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(
    DELETE_PET,
    { variables: { deletePetId: petId } }
  );

  useEffect(() => {
    if (data?.pet) setPetToEdit(data.pet);
  }, [data]);

  useEffect(() => {
    if (deleteData?.deletePet) navigate("/");
  }, [deleteData, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer">
          Pet Detail
        </h2>
        <Link to="/">
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition cursor-pointer">
            ← Back to List
          </button>
        </Link>
      </div>

      {/* Loading / Error */}
      {(loading || deleteLoading) && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
      {deleteError && (
        <p className="text-red-500 text-center">Delete Error: {deleteError.message}</p>
      )}

      {/* Pet Info */}
      {data?.pet && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
            <div className="space-y-1">
              <p className="text-xl font-semibold text-gray-800">{data.pet.name}</p>
              <p className="text-gray-600">
                Breed: <span className="font-medium">{data.pet.breed}</span>
              </p>
              <p className="text-gray-600">
                Age: <span className="font-medium">{data.pet.age}</span>
              </p>
            </div>
            <span className="mt-2 sm:mt-0 px-3 py-1 bg-pink-500 text-white rounded-full font-semibold shadow">
              {data.pet.type}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link to={`/${data.pet.id}/edit`}>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition cursor-pointer">
                Edit Pet
              </button>
            </Link>
            <button
              onClick={() => deletePet()}
              className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transform hover:scale-105 transition cursor-pointer"
            >
              Delete Pet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetDetail;
