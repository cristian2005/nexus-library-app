import { useContext, useState, useEffect, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Custom hook que conecta el contexto global con el catálogo de libros de Nexus.
// Las sucursales las carga GlobalContext una sola vez; aquí solo gestionamos los
// libros de la sucursal actualmente seleccionada.
export const useBooks = () => {
  const {
    branch,
    darkMode,
    toggleDarkMode,
    changeBranch,
    branches,
    branchesData,
    branchesLoading,
    branchesError,
    refetchBranches
  } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Libros de la sucursal actual
  const fetchBooks = useCallback(async (branchName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/books?branch=${branchName}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      setBooks(await res.json());
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(branch);
  }, [branch, fetchBooks]);

  // Libro individual por ID (async)
  const getBookById = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`Error fetching book ${id}:`, err);
      return null;
    }
  }, []);

  // Nombre legible de la sucursal actual. Si aún no llegó la lista
  // (cold start), cae a una tabla local mínima.
  const getCurrentBranchName = () => {
    const found = branches.find(b => b.id === branch);
    if (found?.name) {
      return found.name.replace(/^Nexus\s+/i, '');
    }
    const fallback = {
      madrid: 'Madrid',
      barcelona: 'Barcelona',
      valencia: 'Valencia',
      sevilla: 'Sevilla'
    };
    return fallback[branch] || 'Madrid';
  };

  const refetch = () => {
    fetchBooks(branch);
    refetchBranches();
  };

  return {
    branch,
    darkMode,
    changeBranch,
    toggleDarkMode,
    // Libros de la sucursal actual
    books,
    loading,
    error,
    refetch,
    // Catálogo global de sucursales (desde GlobalContext)
    branches,
    branchesData,
    branchesLoading,
    branchesError,
    getCurrentBranchName,
    getBookById
  };
};
