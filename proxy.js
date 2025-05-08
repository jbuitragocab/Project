import express from 'express';
import fetch from 'node-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('URL requerida');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Error al obtener la imagen');
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const filename = url.split('/').pop() || 'imagen';

    res.set({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': `attachment; filename="${filename}"`
    });

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno al obtener la imagen');
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
