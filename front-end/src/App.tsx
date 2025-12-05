import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AsociadosList from './components/AsociadosList/AsociadosList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f9fafb',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Sistema de Gestión de Asociados
          </h1>
          <p className="text-gray-600 mt-2">
            Administra y filtra los asociados según su estado en el pipeline
          </p>
        </header>
        <main>
          <AsociadosList />
        </main>
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Sistema de Asociados. Todos los derechos reservados.</p>
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;