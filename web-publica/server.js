const http = require(&#39;http&#39;);
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
const VERSION = process.env.APP_VERSION || &#39;1.0&#39;;
const server = http.createServer(async (req, res) =&gt; {
console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
if (req.url === &#39;/health&#39;) {
res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(JSON.stringify({ estado: &#39;ok&#39;, version: VERSION, puerto: PORT }));
return;
}
if (req.url === &#39;/api&#39;) {
try {
const respuesta = await fetch(API_URL);
const datos = await respuesta.text();
res.writeHead(respuesta.status, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(datos);
} catch (error) {
console.error(&#39;Error al conectar con la API:&#39;, error.message);
res.writeHead(502, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(JSON.stringify({ error: &#39;no se pudo conectar con api-interna&#39; }));
}
return;
}
res.writeHead(200, { &#39;Content-Type&#39;: &#39;text/html; charset=utf-8&#39; });
res.end(`
<h1>;Redes con Docker <h1>
<p>Servicio público funcionando<p>
<p>Versión ${VERSION}<p>
<p> <a href="/health">Comprobar /health</a><p>
<p> <a href=/api">Consultar </api><p>
`);
});
