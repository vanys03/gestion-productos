Gestión de Productos
Aplicación web para la gestión y visualización de productos, construida con enfoque profesional, estética cuidada y funcionalidades completas de filtrado, creación y administración. El sistema está pensado para equipos de ventas, inventario o control de catálogo.

🧑‍💻 Stack Tecnológico
Framework: React + TypeScript

UI Framework: Material UI (MUI)

Backend as a Service (BaaS): Firebase

Firestore (base de datos en tiempo real)

Firebase Authentication

Testing: Vitest + React Testing Library + User Event

Herramientas adicionales: Chart.js para visualización de datos

🚀 Instalación y ejecución local
1. Clonar el repositorio
bash
git clone https://github.com/vanys03/gestion-productos.git
cd gestion-productos
2. Instalar dependencias
bash
npm install
3. Variables de entorno
Crea un archivo .env en la raíz del proyecto con las siguientes variables:

env
VITE_FIREBASE_API_KEY=AIzaSyBUQCEm20n8TeHpt5QftgPQ0NgXOXBgo0U
VITE_FIREBASE_AUTH_DOMAIN=gestion-productos-a011b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gestion-productos-a011b
VITE_FIREBASE_STORAGE_BUCKET=gestion-productos-a011b.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=539725094851
VITE_FIREBASE_APP_ID=1:539725094851:web:fff1618b10a874ae7ea776
> Estas credenciales se obtienen desde la consola de Firebase.

4. Ejecutar localmente
bash
npm run dev
La aplicación estará disponible en  https://gestion-productos-a011b.web.app

🧪 Ejecución de pruebas
Ejecutar todas las pruebas una vez:
bash
npx vitest run
Ejecutar pruebas en modo interactivo (watch mode):
bash
npx vitest --watch
Este proyecto incluye pruebas para:

Componentes como FiltersBar, probando inputs y eventos visuales

Funciones de lógica como filtrado, validación y estadísticas

Interacciones simuladas con Firebase (mock de addDoc y collection)

🤖 Uso del asistente de IA
Durante el desarrollo utilicé un asistente de inteligencia artificial para:

Definir la estructura de las pruebas unitarias e integración en React y Firebase

Construir pruebas funcionales para componentes complejos con MUI, simulando interacciones con combobox, TextField y botones

Simular correctamente Firebase en entornos de test con Vitest, mockeando funciones como addDoc, collection y serverTimestamp

Corregir errores de tipado en TypeScript relacionados con propiedades de entrada

Redactar este README.md, con un tono profesional y claridad técnica

Ejemplo: en el componente FiltersBar, la IA ayudó a evitar errores de simulación en el Select de MUI reemplazando fireEvent.change() con interacción realista usando userEvent.click() y screen.findByText().

🗃️ Configuración del BaaS (Firebase)
Colección principal: products
Cada documento de producto tiene la siguiente estructura:

ts
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
Reglas de seguridad de Firestore
js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read, write: if request.auth != null;
    }
  }
}
Esto asegura que solo usuarios autenticados pueden leer o modificar productos.