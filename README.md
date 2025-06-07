# 🏝️ SkiNova - Plataforma de Reservas y Guías de Viaje

## 📖 Descripción
**SkiNova** es una aplicación móvil (con soporte web en desarrollo) diseñada para facilitar la planificación de **viajes nacionales**. Los usuarios pueden **reservar hoteles**, **gestionar transporte** y **explorar recomendaciones de destinos turísticos** en Colombia. Ofrece una experiencia fluida e intuitiva para planificar viajes cómodos, organizados y a la medida.

---

## ✨ Características

- 🔍 Búsqueda de hoteles mediante un **mapa interactivo**.
- 🏨 Reserva de hospedajes con disponibilidad en tiempo real.
- 🚗 Gestión de transporte dentro del destino.
- 📍 Guías turísticas con recomendaciones de lugares para visitar.
- 📆 Calendario para selección de fechas de viaje.
- 🛎️ Notificaciones sobre promociones y recordatorios.
- 🔐 Sistema de autenticación (email/password habilitado).
- 🎯 Panel de administración para gestión de usuarios.
- 🧭 Interfaz responsive para móvil (web aún en construcción).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React Native (Expo SDK 54)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Autenticación:** Firebase Auth (Email/Password activo)
- **Mapas y Geolocalización:** Google Maps API + Expo Location
- **Control de versiones:** Git + GitHub
- **Variables de entorno:** `.env` + `expo-constants`
- **Base de datos previa:** SQL Server (en documentación de prototipo)

---

## ⚙️ Estructura del Proyecto

```

SkiNova/
│
├── assets/                     # Imágenes y recursos globales
├── src/
│   ├── constants/              # Configuraciones generales (ej. firebaseConfig.js)
│   ├── navigation/             # Navegación de pantallas (AppNavigator.js)
│   ├── screens/
│   │   ├── auth/               # Login, Registro, contexto de sesión
│   │   ├── Home/               # Pantalla principal
│   │   ├── Busqueda/           # Pantalla de búsqueda con mapa
│   │   ├── Calendario/         # Selección de fechas
│   │   ├── Notificaciones/     # Mensajes y recordatorios
│   │   └── styles/             # Estilos por pantalla
│   └── styles/                 # Estilos globales (ej. colores, fuentes)
├── .env                        # Variables sensibles (NO subir)
├── App.js
├── app.json
├── package.json
└── .gitignore

````

---

## 🚀 Instalación y Ejecución

### 🔹 Requisitos Previos

- Tener instalado **Node.js** y **npm** (o **yarn**).
- Tener instalado **Expo CLI**:

```bash
npm install -g expo-cli
````

---

### 🔹 Clonar el repositorio

```bash
git clone https://github.com/AlexanderVelez302/skinova.git
cd skinova
```

---

### 🔹 Instalar dependencias

```bash
npm install
```

---

### 🔹 Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto y agrega tus claves de Firebase:

```
EXPO_PUBLIC_API_KEY=TU_API_KEY
EXPO_PUBLIC_AUTH_DOMAIN=TU_AUTH_DOMAIN
EXPO_PUBLIC_PROJECT_ID=TU_PROJECT_ID
EXPO_PUBLIC_STORAGE_BUCKET=TU_STORAGE_BUCKET
EXPO_PUBLIC_MESSAGING_SENDER_ID=TU_SENDER_ID
EXPO_PUBLIC_APP_ID=TU_APP_ID
```

> 🔒 Este archivo está en `.gitignore` y **no debe subirse** a GitHub.

---

### ▶️ Ejecutar la app

```bash
npx expo start
```

Abre el proyecto con **Expo Go** en tu celular o en un emulador Android/iOS.

---

## 🧾 Notas Adicionales

* La autenticación con **Google aún no está implementada**. Solo está disponible login con email y contraseña.
* El backend ya está migrado a Firebase usando **Firebase Admin SDK** para operaciones administrativas (como eliminar usuarios desde el panel admin).
* Si necesitas usar funcionalidades avanzadas como Analytics, se debe reactivar `measurementId`.

---

## ✉️ Contacto

Desarrollado por **Alexander Vélez**
GitHub: [@AlexanderVelez302](https://github.com/AlexanderVelez302)x