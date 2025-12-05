# COAVANCOL - Frontend

Aplicación web desarrollada con React, TypeScript y Vite para la gestión de asociados en COAVANCOL.

## 🚀 Tecnologías Principales

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - JavaScript tipado para mayor robustez
- **Vite** - Herramienta de construcción y desarrollo
- **Material-UI (MUI)** - Biblioteca de componentes UI
- **React Query** - Manejo de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP

## 📁 Estructura de Carpetas

```
front-end/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── components/         # Componentes reutilizables
│   │   └── AsociadosList/  # Componente principal de lista de asociados
│   ├── core/
│   │   └── types/          # Tipos y interfaces TypeScript
│   ├── hooks/              # Custom hooks
│   ├── services/           # Servicios y llamadas a la API
│   ├── App.tsx             # Componente raíz
│   └── main.tsx            # Punto de entrada de la aplicación
├── .eslintrc.js            # Configuración de ESLint
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

## 🛠️ Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior) o yarn
- Backend de COAVANCOL en ejecución

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd COAVANCOL-Prueba-T-cnica-/front-end
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto con:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

## 🧪 Comandos Disponibles

- `dev` - Inicia el servidor de desarrollo
- `build` - Construye la aplicación para producción
- `preview` - Previsualiza la versión de producción
- `lint` - Ejecuta el linter
- `type-check` - Verifica los tipos de TypeScript

## 📦 Dependencias Principales

- `@emotion/react` - Estilizado de componentes
- `@mui/material` - Componentes UI
- `@tanstack/react-query` - Manejo de estado del servidor
- `axios` - Cliente HTTP
- `react-hook-form` - Manejo de formularios
- `zod` - Validación de esquemas
- `react-router-dom` - Enrutamiento

## 🔧 Configuración del Backend

Asegúrate de que el backend esté ejecutándose en `http://localhost:3000` o actualiza la variable de entorno `VITE_API_URL` según corresponda.

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✉️ Contacto

[Tu Nombre] - [tu@email.com](mailto:tu@email.com)
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
