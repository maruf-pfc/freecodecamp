import { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const PetList = lazy(() => import("./pages/PetList"));
const PetDetail = lazy(() => import("./pages/PetDetail"));
const EditPet = lazy(() => import("./pages/EditPet"));
const AddPet = lazy(() => import("./pages/AddPet"));

function App() {
  const [petToEdit, setPetToEdit] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50">
      <Router>
        {/* Navbar */}
        <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            >
              Pet Shelter
            </Link>
            <nav className="space-x-4">
              <Link
                to="/add"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                + Add Pet
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto p-6">
          <Suspense fallback={<p className="text-center text-gray-500 mt-10">Loading...</p>}>
            <Routes>
              <Route path="/" element={<PetList />} />
              <Route path="/:petId" element={<PetDetail setPetToEdit={setPetToEdit} />} />
              <Route path="/:petId/edit" element={<EditPet petToEdit={petToEdit} />} />
              <Route path="/add" element={<AddPet />} />
            </Routes>
          </Suspense>
        </main>
      </Router>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 mt-10">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          © {new Date().getFullYear()} Pet Shelter. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
