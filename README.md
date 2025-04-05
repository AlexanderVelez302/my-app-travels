
# 🏝️ MyApp Travels - Plataforma de Reservas y Guías de Viaje

## 📖 Descripción
**MyApp Travels** es una aplicación móvil y web diseñada para facilitar la planificación de viajes nacionales. Los usuarios pueden **reservar hoteles**, **gestionar transporte** y **explorar recomendaciones de destinos turísticos** dentro del país. La app ofrece una experiencia fluida para planificar viajes cómodos y organizados.

## ✨ Características
- 🔍 Búsqueda de hoteles mediante un mapa interactivo.
- 🏨 Reserva de hospedajes con disponibilidad en tiempo real.
- 🚗 Gestión de transporte dentro del destino.
- 📍 Guías turísticas con recomendaciones de lugares.
- 📶 Modo offline para acceso sin conexión.
- 📱 Interfaz intuitiva y responsive para móvil y web.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React Native (Expo)
- **Backend:** Firebase Realtime Database / Firestore
- **Autenticación:** Firebase Auth
- **Mapas y Geolocalización:** Google Maps API
- **Base de datos anterior:** SQL Server (solo en documentación/prototipo)

---

## ⚙️ Estructura del Proyecto

```
my-app-travels/
│
├── assets/                     # Imágenes globales
├── src/
│   ├── assets/                 # Recursos gráficos adicionales
│   ├── constants/             # Configuraciones (ej. firebaseConfig.js)
│   ├── navigation/            # Rutas y navegación (AppNavigator.js)
│   ├── screens/
│   │   ├── auth/              # Pantallas de Login y Registro + AuthContext
│   │   └── styles/            # Archivos de estilos para cada pantalla
│   └── styles/                # Estilos generales
├── App.js
├── app.json
├── package.json
└── .gitignore
```

---

## 🚀 Instalación y Ejecución

### 🔹 Requisitos Previos
- Tener instalado **Node.js** y **npm** (o **yarn**).
- Tener instalado **Expo CLI**:
```bash
npm install -g expo-cli
```

### 🔹 Clonar el repositorio
```bash
git clone https://github.com/AlexanderVelez302/my-app-travels.git
cd my-app-travels
```

### 🔹 Instalar dependencias
```bash
npm install
```

---

## 🔐 Configuración de Firebase

### ⚠️ Nota:
El archivo `firebaseConfig.js` ubicado en `src/constants/` **no se sube al repositorio por seguridad**. Debes crearlo manualmente con tu configuración personal de Firebase:

```javascript
// src/constants/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export { auth };
```

---

## ▶️ Ejecución del Proyecto

Una vez configurado Firebase:

```bash
npx expo start
```

Puedes abrirlo desde tu celular usando la app de **Expo Go**, o desde un emulador Android/iOS.

---

## 🧾 Notas Adicionales

- Si recibes advertencias de versiones incompatibles (por ejemplo, con `react-native-maps`), puedes instalar la versión recomendada por Expo:
```bash
npm install react-native-maps@1.18.0
```

---

¿Quieres agregar capturas de pantalla, un demo en video o una sección de preguntas frecuentes (FAQ)? Puedo ayudarte a incluirlo también.
