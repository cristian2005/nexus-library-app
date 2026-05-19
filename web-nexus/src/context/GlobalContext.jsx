import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const GlobalProvider = ({ children }) => {
  const [branch, setBranch] = useState('madrid');
  const [darkMode, setDarkMode] = useState(false);

  // Catálogo global de sucursales — se carga UNA sola vez al montar la app.
  const [branches, setBranches] = useState([]);
  const [branchesData, setBranchesData] = useState({});
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState(null);

  const loadBranches = async () => {
    setBranchesLoading(true);
    setBranchesError(null);
    try {
      const resBranches = await fetch(`${API_BASE_URL}/api/branches`);
      if (!resBranches.ok) {
        throw new Error(`Error ${resBranches.status} cargando sucursales`);
      }
      const branchList = await resBranches.json();

      // Peticiones en paralelo para cargar libros de cada sucursal.
      const booksByBranch = await Promise.all(
        branchList.map(b =>
          fetch(`${API_BASE_URL}/api/books?branch=${b.id}`)
            .then(r => (r.ok ? r.json() : []))
            .catch(() => [])
        )
      );

      const map = {};
      branchList.forEach((b, i) => {
        map[b.id] = { ...b, books: booksByBranch[i] };
      });

      setBranches(branchList);
      setBranchesData(map);
    } catch (err) {
      console.error('Error loading branches:', err);
      setBranchesError(err.message);
      setBranches([]);
      setBranchesData({});
    } finally {
      setBranchesLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const changeBranch = (newBranch) => setBranch(newBranch);

  return (
    <GlobalContext.Provider
      value={{
        branch,
        darkMode,
        toggleDarkMode,
        changeBranch,
        branches,
        branchesData,
        branchesLoading,
        branchesError,
        refetchBranches: loadBranches
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
