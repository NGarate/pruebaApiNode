**Prueba simple API NodeJS**  
Para iniciar:
* Descargar
* Instalar dependencias `npm install`
* Crear el archivo de configuración `config.js`
* Con este contenido:
``` 
exports.PORT = <listen port>;
exports.DB_PATH = <mongodb path>;
exports.DB_NAME = <database name>;
exports.ACCESS_TOKEN = <token literal>;
```
Los endpoints disponibles son:
* GET /products
> Devuelve todos los productos en un array hasta el límite.  
> Acepta el parámetro limit, por defecto es 20.
* GET /product/:id
> Devuelve un producto en JSON con el id aportado.
* POST /product
> Agrega un producto.  
> Require el campo name.  
> Acepta el campo opcional description.  
> Require el header `Authorization` con el valor access_token.
* DELETE /product/:id
> Elimina el producto con el id aportado  
> Require el header `Authorization` con el valor access_token.
