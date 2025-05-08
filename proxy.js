import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('URL requerida');

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const filename = url.split('/').pop() || 'imagen';

    res.set({
      'Content-Type': contentType || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': `attachment; filename="${filename}"`
    });

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener la imagen');
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
