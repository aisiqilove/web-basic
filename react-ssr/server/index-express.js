import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import express from 'express';
import App from '../src/App';

const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
  const content = renderToString(<StaticRouter location={req.url}>
    {App}
  </StaticRouter>);
  var html = `
    <html>
       <head>
         <title>ssr-express</title>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="bundle.js"></script>
       </body>
     </html>
    `;
  res.send(html);
})

app.listen(8081, () => {
  console.log('90: ssr 开启 ');
});