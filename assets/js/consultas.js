const { Pool } = require ( "pg" );

const config={
    user: "fidonoso_desafiolatam" ,
    host: "postgresql-fidonoso.alwaysdata.net",
    // host: "localhost" ,
    password: "desafio1234" ,
    database: "fidonoso_softlife",
    port: 5432 ,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

// funcion para agregar un nuevo usuario a la BD
const insertar = async (datos) => {
    const consulta={
        text: "INSERT INTO usuarios (email, password) values($1, $2)",
        values: datos
    };
    try{
    const result = await pool.query( consulta );
    return result;
    }catch(e){
        console.log(e.code)
        return e
    }
};


//funcion para consultar todos los usuarios en la BD y pintar en el HTML
const consultar=async ()=>{
    try {
        const result = await pool.query( "SELECT * FROM usuarios;" );
        return result.rows;
    } catch (error) {
        console .log(error.code);
        return error
    }
};
// funcion para validar los usuarios
const validar=async (datos)=>{
    try {
        const result = await pool.query( `SELECT email, password FROM usuarios WHERE email='${datos[0]}' AND password='${datos[1]}';` );
        return result.rowCount;
    } catch (error) {
        console .log(error.code);
        return error
    }
};
module.exports={insertar, consultar, validar}