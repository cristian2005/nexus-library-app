# API Nexus - Mock Server

Mock API REST para la librería universitaria **Nexus** construida con [json-server](https://github.com/typicode/json-server).

## 📋 Características

- ✅ **12 libros** distribuidos en 4 sucursales (Madrid, Barcelona, Valencia, Sevilla)
- ✅ **4 sucursales** con información completa (dirección, teléfono, horarios, coworking, etc.)
- ✅ **CORS habilitado** para acceso desde cualquier origen
- ✅ **Bind a 0.0.0.0** para acceso desde red local (móvil, tablet)
- ✅ **Puerto dinámico** para despliegue en producción (Render)
- ✅ **Rutas bajo /api** para seguir convenciones REST

## 🚀 Instalación

```bash
cd api-nexus
npm install
```

## ▶️ Ejecución

### Desarrollo (puerto 4000 fijo)

```bash
npm run dev
```

El servidor estará disponible en:
- **Local**: `http://localhost:4000`
- **Red local**: `http://<tu-ip>:4000` (por ejemplo, desde tu móvil)

### Producción (puerto dinámico desde process.env.PORT)

```bash
npm start
```

Render y otras plataformas asignarán automáticamente el puerto mediante `process.env.PORT`.

## 📡 Endpoints

### Libros

#### Obtener todos los libros
```http
GET /api/books
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Ingeniería del Software",
    "pages": 464,
    "rating": "4.7/5",
    "availableDates": ["2026-05-02", "2026-05-10", "2026-05-18"],
    "synopsis": "Manual imprescindible sobre las buenas prácticas...",
    "image": "https://via.placeholder.com/300x400/1e5aa8/ffffff?text=Clean+Code",
    "publisher": "Prentice Hall",
    "year": 2008,
    "language": "Inglés",
    "isbn": "978-0132350884",
    "stock": 4,
    "price": 35.90,
    "branch": "madrid"
  },
  ...
]
```

#### Obtener un libro por ID
```http
GET /api/books/:id
```

**Ejemplo:**
```bash
curl http://localhost:4000/api/books/1
```

#### Filtrar libros por sucursal
```http
GET /api/books?branch=madrid
```

**Ejemplos:**
```bash
# Libros de Madrid
curl http://localhost:4000/api/books?branch=madrid

# Libros de Barcelona
curl http://localhost:4000/api/books?branch=barcelona

# Libros de Valencia
curl http://localhost:4000/api/books?branch=valencia

# Libros de Sevilla
curl http://localhost:4000/api/books?branch=sevilla
```

#### Filtrar libros por género
```http
GET /api/books?genre=Ingeniería del Software
```

#### Búsqueda por título (contiene)
```http
GET /api/books?title_like=Clean
```

#### Paginación
```http
GET /api/books?_page=1&_limit=5
```

### Sucursales

#### Obtener todas las sucursales
```http
GET /api/branches
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": "madrid",
    "name": "Nexus Madrid",
    "address": "Calle Gran Vía, 28, 28013 Madrid",
    "phone": "+34 915 234 567",
    "hours": "Lunes a Viernes: 9:00 - 21:00, Sábados: 10:00 - 20:00, Domingos: 11:00 - 15:00",
    "coworkingSeats": 45,
    "wifi": "Fibra óptica 1 Gbps - Red: Nexus_Madrid",
    "parking": true
  },
  ...
]
```

#### Obtener una sucursal por ID
```http
GET /api/branches/:id
```

**Ejemplos:**
```bash
curl http://localhost:4000/api/branches/madrid
curl http://localhost:4000/api/branches/barcelona
curl http://localhost:4000/api/branches/valencia
curl http://localhost:4000/api/branches/sevilla
```

## 🔍 Características avanzadas de json-server

### Ordenación
```http
GET /api/books?_sort=price&_order=asc
GET /api/books?_sort=rating&_order=desc
```

### Búsqueda full-text
```http
GET /api/books?q=Cervantes
```

### Operadores
```http
GET /api/books?pages_gte=500        # Páginas >= 500
GET /api/books?price_lte=30         # Precio <= 30
GET /api/books?year_ne=2008         # Año diferente de 2008
```

### Relaciones (expandir)
```http
GET /api/books?_embed=reviews       # Si tuviéramos reviews
```

## 🌐 Acceso desde red local

Para acceder desde tu móvil u otros dispositivos en la misma red:

1. Averigua tu IP local:
   - **Windows**: `ipconfig` (busca IPv4)
   - **Mac/Linux**: `ifconfig` o `ip addr`

2. Accede desde el móvil a:
   ```
   http://<tu-ip>:4000/api/books
   ```

**Ejemplo:**
```
http://192.168.1.100:4000/api/books
```

## 📦 Estructura de datos

### Libro (Book)
```typescript
{
  id: number
  title: string
  author: string
  genre: string
  pages: number
  rating: string
  availableDates: string[]
  synopsis: string
  image: string
  publisher: string
  year: number
  language: string
  isbn: string
  stock: number
  price: number
  branch: "madrid" | "barcelona" | "valencia" | "sevilla"
}
```

### Sucursal (Branch)
```typescript
{
  id: string
  name: string
  address: string
  phone: string
  hours: string
  coworkingSeats: number
  wifi: string
  parking: boolean
}
```

## 🚢 Despliegue en Render

1. Crear un nuevo **Web Service** en [Render](https://render.com)
2. Conectar tu repositorio
3. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Render asignará automáticamente `process.env.PORT`

## 📝 Notas

- El archivo `db.json` contiene **todos los 12 libros** de las 4 sucursales originales
- Cada libro tiene el campo `branch` que indica su sucursal
- El servidor escucha en `0.0.0.0` para permitir conexiones desde red local
- CORS está habilitado para todos los orígenes
- En desarrollo usa puerto 4000, en producción usa `process.env.PORT`

## 🛠️ Tecnologías

- [json-server](https://github.com/typicode/json-server) - Mock REST API
- Node.js >= 18

## 📄 Licencia

MIT
