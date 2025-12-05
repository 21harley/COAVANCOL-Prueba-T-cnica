import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAsociados from '../../hooks/useAsociados';
import type { EstadoPipeline } from '../../core/types/asociado';

const AsociadosList: React.FC = () => {
  const { 
    asociados, 
    loading, 
    error, 
    filter, 
    setFilter, 
    refetch 
  } = useAsociados();

  const filterOptions: (EstadoPipeline | 'Todos')[] = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Prospecto':
        return 'bg-blue-100 text-blue-800';
      case 'Expediente en Construcción':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente Jurídico':
        return 'bg-orange-100 text-orange-800';
      case 'Pendiente Cierre de Crédito':
        return 'bg-purple-100 text-purple-800';
      case 'Pendiente Firma y Litivo':
        return 'bg-indigo-100 text-indigo-800';
      case 'Pendiente Revisión Abogado':
        return 'bg-pink-100 text-pink-800';
      case 'Cartera Activa':
        return 'bg-green-100 text-green-800';
      case 'Desembolsado/Finalizado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && asociados.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography ml={2}>Cargando asociados...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ mt: 2 }}
        action={
          <IconButton 
            aria-label="reintentar" 
            color="inherit" 
            size="small"
            onClick={refetch}
          >
            <RefreshIcon />
          </IconButton>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <div className="p-6">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Lista de Asociados
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl sx={{ minWidth: 300 }} size="small">
            <InputLabel id="filter-select-label">Filtrar por Estado</InputLabel>
            <Select
              labelId="filter-select-label"
              id="filter-select"
              value={filter}
              label="Filtrar por Estado"
              onChange={(e) => setFilter(e.target.value as EstadoPipeline | 'Todos')}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Actualizar">
            <IconButton 
              onClick={refetch} 
              color="primary"
              disabled={loading}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de asociados">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">Código</TableCell>
              <TableCell className="font-bold">Nombre</TableCell>
              <TableCell className="font-bold">Identificación</TableCell>
              <TableCell className="font-bold">Estado</TableCell>
              <TableCell className="font-bold">Última Actualización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asociados.length > 0 ? (
              asociados.map((asociado) => (
                <TableRow
                  key={asociado.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{asociado.codigo}</TableCell>
                  <TableCell component="th" scope="row">
                    {asociado.nombre}
                  </TableCell>
                  <TableCell>{asociado.identificacion}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asociado.estado_pipeline)}`}>
                      {asociado.estado_pipeline}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(asociado.ultima_actualizacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  align="center" 
                  className="py-8"
                  sx={{ height: 200 }}
                >
                  <Typography color="textSecondary">
                    No hay asociados para mostrar
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="textSecondary">
          Mostrando {asociados.length} asociado{asociados.length !== 1 ? 's' : ''}
        </Typography>
        {loading && (
          <Box display="flex" alignItems="center">
            <CircularProgress size={20} />
            <Typography variant="body2" color="textSecondary" ml={1}>
              Actualizando...
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AsociadosList;
