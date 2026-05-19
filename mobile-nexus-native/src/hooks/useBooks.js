import { useCallback, useEffect, useState } from 'react';
import { API_URL, BRANCHES_FALLBACK } from '../config';

// placehold.co devuelve SVG por defecto, que <Image> de RN no renderiza.
// Insertamos .png para forzar PNG, que sí carga nativamente en Android/iOS.
const normalizeImage = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('placehold.co/') && !/\.(png|jpe?g|webp|gif)(?:\?|$)/i.test(url)) {
    return url.replace(/(\?|$)/, '.png$1');
  }
  return url;
};

const withNormalizedImage = (book) => (book ? { ...book, image: normalizeImage(book.image) } : book);

/**
 * Hook reutilizable que consume la API de Nexus (json-server en Render).
 *
 * Soporta:
 *   - getBooks(branch?)     → lista de libros (filtrable por sucursal)
 *   - getBookById(id)       → libro individual (path param)
 *   - getBranches()         → todas las sucursales
 *   - getBranchById(id)     → detalle de sucursal
 *
 * Mantiene estado interno `books` cuando se llama a refresh() con una sucursal,
 * útil para pantallas tipo Home/Lista que filtran por sucursal.
 */
export const useBooks = (initialBranch = null) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (branch = initialBranch) => {
    setLoading(true);
    setError(null);
    try {
      const url = branch
        ? `${API_URL}/api/books?branch=${encodeURIComponent(branch)}`
        : `${API_URL}/api/books`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error ${res.status} cargando libros`);
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw.map(withNormalizedImage) : raw;
      setBooks(data);
      return data;
    } catch (err) {
      setError(err.message);
      setBooks([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [initialBranch]);

  useEffect(() => {
    if (initialBranch !== undefined) {
      fetchBooks(initialBranch);
    }
  }, [initialBranch, fetchBooks]);

  return {
    books,
    loading,
    error,
    refetch: fetchBooks,
    branchName: BRANCHES_FALLBACK[initialBranch] || ''
  };
};

/** Petición individual de un libro por id (sin estado React). */
export const fetchBookById = async (id) => {
  const res = await fetch(`${API_URL}/api/books/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status} cargando el libro ${id}`);
  return withNormalizedImage(await res.json());
};

/** Petición individual de una sucursal por id. */
export const fetchBranchById = async (id) => {
  const res = await fetch(`${API_URL}/api/branches/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status} cargando la sucursal ${id}`);
  return res.json();
};

/** Lista completa de sucursales. */
export const fetchBranches = async () => {
  const res = await fetch(`${API_URL}/api/branches`);
  if (!res.ok) throw new Error(`Error ${res.status} cargando sucursales`);
  return res.json();
};
