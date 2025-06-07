# 🎿 SkiNova - Plataforma de Viajes Nacionales

## 📖 Descripción
**SkiNova** es una aplicación móvil y próximamente web que facilita la planificación de **viajes nacionales en Colombia**. Permite a los usuarios **reservar hoteles**, **gestionar transporte terrestre o aéreo**, y **explorar guías turísticas** con recomendaciones locales. Con una interfaz simple y un enfoque centrado en el usuario, SkiNova busca ser tu copiloto digital ideal.

## ✨ Características Actuales
- 🔒 Registro e inicio de sesión con correo/contraseña (Firebase Auth)
- 🧑‍💼 Panel de administración para gestión de usuarios (solo admins)
- ⚙️ Backend funcional con Firebase Admin SDK para operaciones seguras
- 📍 Visualización de ubicación en mapa con Google Maps
- 🧭 Navegación fluida entre pantallas (React Navigation)
- 🔐 Persistencia de sesión automática

## 🧪 Características en Desarrollo
- 🔍 Búsqueda de hoteles y destinos
- 📅 Calendario interactivo para seleccionar fechas de viaje
- 🚗 Reservas de transporte terrestre/aéreo
- 🏨 Sistema de reservas con disponibilidad en tiempo real
- 📢 Notificaciones sobre promociones y recordatorios de viaje
- 🌐 Acceso web desde navegador (en revisión)
- 🎨 Mejoras de diseño en pantallas de login y registro
- 🌍 Modo offline (pendiente)

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React Native (Expo)
- **Backend:** Node.js + Firebase Admin SDK
- **Base de datos:** Firestore (Firebase)
- **Autenticación:** Firebase Auth
- **Mapas y Geolocalización:** Google Maps API
- **Prototipo/documentación previa:** SQL Server

---

## ⚙️ Estructura del Proyecto

```
SkiNova/
│
├── assets/                     # Imágenes globales
├── src/
│   ├── assets/                 # Recursos gráficos adicionales
│   ├── constants/              # Configuraciones (ej. firebaseConfig.js)
│   ├── navigation/             # Rutas y navegación
│   ├── screens/
│   │   ├── auth/               # Login y Registro
│   │   ├── AdminPanel/         # Pantallas solo para admins
│   │   ├── Home/               # Pantalla principal del usuario
│   │   ├── Search/             # Búsqueda (en desarrollo)
│   │   ├── Calendar/           # Calendario de fechas (en desarrollo)
│   │   ├── Notifications/      # Notificaciones (en desarrollo)
│   │   └── styles/             # Estilos individuales por pantalla
│   └── styles/                 # Estilos globales
├── App.js
├── app.json
├── package.json
└── .gitignore
```

---

## 🚀 Instalación y Ejecución

### 🔹 Requisitos Previos
- Tener instalado **Node.js** y **npm** (o **yarn**)
- Tener instalado **Expo CLI**:
```bash
npm install -g expo-cli
```

### 🔹 Clonar el repositorio
```bash
git clone https://github.com/AlexanderVelez302/SkiNova.git
cd SkiNova
```

### 🔹 Instalar dependencias
```bash
npm install
```

---

## 🔐 Configuración de Firebase

> ⚠️ El archivo `firebaseConfig.js` ubicado en `src/constants/` **no se incluye en el repositorio** por motivos de seguridad. Debes crearlo tú mismo con tus credenciales.

```javascript
// src/constants/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

---

## ▶️ Ejecución del Proyecto

Una vez configurado Firebase, ejecuta:

```bash
npx expo start
```

Puedes abrir la app desde tu dispositivo móvil usando **Expo Go** o desde un emulador Android/iOS.

---

## 🧾 Notas Adicionales

- Si aparecen advertencias relacionadas con `react-native-maps`:
```bash
npm install react-native-maps@1.18.0
```

- El inicio de sesión con Google, Apple y otros métodos sociales aún **no está implementado**.