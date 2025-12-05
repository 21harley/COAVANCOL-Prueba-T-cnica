import React from 'react';
import useAsociados from '../hooks/useAsociados';
import type { EstadoPipeline } from '../core/types/asociado';

const AsociadosList: React.FC = () => {
  const { 
    asociados, 
    loading, 
    error, 
    filter, 
    setFilter,
    refetch
  } = useAsociados();

  // Definir los estados disponibles para el filtro
  const estados: (EstadoPipeline | 'Todos')[] = [
    'Todos',
    'Prospecto',
    'Expediente en Construcción',
    'Pendiente Jurídico',
    'Pendiente Cierre de Crédito',
    'Pendiente Firma y Litivo',
    'Pendiente Revisión Abogado',
    'Cartera Activa',
    'Desembolsado/Finalizado'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={refetch}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Asociados</h1>
        <div className="flex items-center">
          <label htmlFor="estadoFilter" className="mr-2 text-gray-700">
            Filtrar por estado:
          </label>
          <select
            id="estadoFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as EstadoPipeline | 'Todos')}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <button
            onClick={refetch}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Actualizar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Actualización
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {asociados.length > 0 ? (
              asociados.map((asociado) => (
                <tr key={asociado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asociado.codigo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asociado.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asociado.identificacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      asociado.estado_pipeline === 'Cartera Activa' ? 'bg-green-100 text-green-800' :
                      asociado.estado_pipeline === 'Desembolsado/Finalizado' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {asociado.estado_pipeline}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(asociado.ultima_actualizacion).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron asociados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsociadosList;
