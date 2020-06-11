// import
const express = require('express');
const next = require('next');

// app
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE.ENV !== 'production';
const app = next({ dev });

// handler
const handle = app.getRequestHandler();

// prepare app with express server
app.prepare().then(() => {
  const server = express();

  // /cast/:personId
  server.get('/cast/:personId', (req, res) => {
    const { personId } = req.params;
    return app.render(req, res, '/cast', { personId });
  });

  // pass requests to next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Server is listing to ${port}`);
  });
});
