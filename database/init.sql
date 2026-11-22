SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS biblioteca_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE biblioteca_db;

CREATE TABLE IF NOT EXISTS libros (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor  VARCHAR(100) NOT NULL,
  estado VARCHAR(30)  NOT NULL
);

INSERT INTO libros (titulo, autor, estado) VALUES
  ('El principito',            'Antoine de Saint-Exupéry', 'Disponible'),
  ('Don Quijote de la Mancha', 'Miguel de Cervantes',      'Prestado'),
  ('Veinte poemas de amor',    'Pablo Neruda',             'Disponible'),
  ('Ficciones',                'Jorge Luis Borges',        'En reparación');
