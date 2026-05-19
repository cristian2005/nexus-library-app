import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  noCors: false
});

// Obtener puerto desde argumentos CLI o variable de entorno
const getPort = () => {
  const args = process.argv.slice(2);
  const portArgIndex = args.findIndex(arg => arg === '--port');

  if (portArgIndex !== -1 && args[portArgIndex + 1]) {
    return parseInt(args[portArgIndex + 1], 10);
  }

  return process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
};

const PORT = getPort();

// Configurar CORS manualmente para asegurar acceso desde cualquier origen
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Middlewares por defecto (logger, static, cors)
server.use(middlewares);

// Parser de body
server.use(jsonServer.bodyParser);

// Health check para Render y monitorización
server.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Reescribir rutas: /api/* → /* (preserva path y query string).
// Usamos un middleware manual porque el rewriter de json-server no procesa
// correctamente los query strings con el patrón /api/* en esta versión.
server.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.substring(4); // "/api/books?x=y" → "/books?x=y"
  } else if (req.url === '/api') {
    req.url = '/';
  }
  next();
});

// Router de json-server
server.use(router);

// Escuchar en 0.0.0.0 para permitir acceso desde red local
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 JSON Server is running on http://0.0.0.0:${PORT}`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   - GET    http://localhost:${PORT}/api/books`);
  console.log(`   - GET    http://localhost:${PORT}/api/books/:id`);
  console.log(`   - GET    http://localhost:${PORT}/api/books?branch=madrid`);
  console.log(`   - GET    http://localhost:${PORT}/api/branches`);
  console.log(`   - GET    http://localhost:${PORT}/api/branches/:id`);
  console.log(`\n🌐 Accesible desde red local en puerto ${PORT}`);
  console.log(`💡 Para producción (Render), se usa process.env.PORT`);
});
