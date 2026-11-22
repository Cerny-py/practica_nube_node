const http = require('http');
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
});

const PORT = 3000;

http.createServer(async (req, res) => {
  // Endpoint liviano para el healthcheck del contenedor
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  if (req.url !== '/') {
    res.writeHead(404);
    return res.end();
  }

  try {
    const [libros] = await db.query(
      'SELECT id, titulo, autor, estado FROM libros ORDER BY id'
    );

    const filas = libros.map((l) => `
      <tr class="libro">
        <td>${l.id}</td>
        <td>${l.titulo}</td>
        <td>${l.autor}</td>
        <td>${l.estado}</td>
      </tr>`).join('');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Catálogo de la Biblioteca</title>
  <style>
    body { font-family: sans-serif; margin: 2rem; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: .5rem 1rem; text-align: left; }
    th { background: #eee; }
  </style>
</head>
<body>
  <h1>Catálogo de la Biblioteca</h1>
  <p>Total de libros: <strong id="total">${libros.length}</strong></p>
  <table>
    <tr><th>ID</th><th>Título</th><th>Autor</th><th>Estado</th></tr>
    ${filas}
  </table>
</body>
</html>`);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Error al consultar la base de datos: ${err.message}\n`);
  }
}).listen(PORT, () => console.log(`App escuchando en puerto ${PORT}`));
