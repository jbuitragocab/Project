# Descargador de imagenes

Esta aplicación consta de un servidor proxy en Node.js/Express que permite descargar imágenes desde cualquier URL, evitando problemas de CORS y forzando la descarga.

## Cómo usar

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   npm start
   ```
3. Abre `index.html` en tu navegador (puedes servirlo con un servidor estático si quieres evitar restricciones de CORS locales).
4. Ingresa la URL de la imagen y haz clic en "Descargar".
