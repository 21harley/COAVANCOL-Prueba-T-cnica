# COAVANCOL - Prueba Técnica

## Estructura del Proyecto

```
COAVANCOL-Prueba-T-cnica/
├── back-end/               # Backend del proyecto
│   ├── prisma/            # Configuración de Prisma ORM
│   ├── src/               # Código fuente del backend
│   │   ├── controllers/   # Controladores de la API
│   │   ├── routes/        # Rutas de la API
│   │   └── types/         # Tipos TypeScript
│   └── package.json       # Dependencias del backend
│
├── core/                  # Código compartido entre frontend y backend
│   └── types/             # Tipos compartidos
│
└── front-end/             # Frontend del proyecto
    ├── public/            # Archivos estáticos
    └── src/               # Código fuente del frontend
        ├── assets/        # Recursos estáticos
        ├── components/    # Componentes React
        └── services/      # Servicios y llamadas a la API
```

## Tecnologías Principales

### Frontend
- React con TypeScript
- Vite como bundler
- React Router para la navegación
- Axios para peticiones HTTP
- TailwindCSS para estilos

### Backend
- Node.js con TypeScript
- Express.js como framework web
- Prisma como ORM
- SQLite como base de datos

### Herramientas de Desarrollo
- TypeScript para tipado estático
- ESLint y Prettier para formateo de código
- Git para control de versiones
