import { useState, useEffect, useCallback } from 'react';
import type { Asociado, EstadoPipeline } from '../core/types/asociado';
import { getAsociados } from '../services/api';

const useAsociados = () => {
  const [asociados, setAsociados] = useState<Asociado[]>([]);
  const [filteredAsociados, setFilteredAsociados] = useState<Asociado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EstadoPipeline | 'Todos'>('Todos');

  const fetchAsociados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAsociados();
      const sortedData = [...data].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      );
      
      setAsociados(sortedData);
      setFilteredAsociados(sortedData);
    } catch (err) {
      setError('Error al cargar los asociados');
      console.error('Error fetching asociados:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback((newFilter: EstadoPipeline | 'Todos') => {
    setFilter(newFilter);
    
    if (newFilter === 'Todos') {
      setFilteredAsociados(asociados);
    } else {
      const filtered = asociados.filter(
        asociado => asociado.estado_pipeline === newFilter
      );
      setFilteredAsociados(filtered);
    }
  }, [asociados]);

  useEffect(() => {
    fetchAsociados();
  }, [fetchAsociados]);

  useEffect(() => {
    handleFilterChange(filter);
  }, [asociados, filter, handleFilterChange]);

  return {
    asociados: filteredAsociados,
    loading,
    error,
    filter,
    setFilter: handleFilterChange,
    refetch: fetchAsociados,
  };
};

export default useAsociados;
