const http = require ( "http" );
const fs=require('fs');
const {insertar, consultar, validar}=require('./assets/js/consultas.js');

http.createServer(async (req, res) => {
// ruta para cargar la pagina HTML en localhost:3000/
    if (req.url == "/" && req.method === "GET" ) {
        res.setHeader( "content-type" , "text/html" );
        res.end( fs.readFileSync( "index.html" , "utf8" ));
    };

//ruta para insertar en la base de datos fidonoso_softlife en postgresql-fidonoso.alwaysdata.net
    if((req.url=='/usuario' && req.method === "POST")){
        let body=''
        req.on('data',(chunk) => {
            body+=chunk
        });
        req.on('end', async()=>{ 
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertar(datos);
            res.end(JSON.stringify(respuesta));     
        })
    };
// ruta para leer todos desde la base de datos y pintar en HTML
    if((req.url=='/usuarios' && req.method === "GET")){
        const registros = await consultar();
        res.end(JSON.stringify(registros));    
    };
//validacion correo y contraseña en base de datos remota
    if((req.url=='/login' && req.method === "POST")){
        let body=''
        req.on('data',(chunk) => {
            body+=chunk
        });
        req.on('end', async()=>{ 
            const datos = Object.values(JSON.parse(body));
            const respuesta = await validar(datos);
            res.end(JSON.stringify(respuesta));
        })
    };

}).listen( 3000, ()=>{ console.log(`Servidor escuchando en el puerto 300 con PID: ${process.pid}`)} );