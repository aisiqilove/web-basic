import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'

const app = express();
app.use(express.static('public'))
app.get('*', (req, res) => {
  const content = renderToString(App);
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

app.listen(8001, () => {
  console.log('90: ssr 开启 ')
})