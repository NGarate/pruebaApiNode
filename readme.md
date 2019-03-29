# Prueba simple API NodeJS
## Para iniciar:
* Clonar o descargar.
* Instalar dependencias `npm install`.
* Editar el archivo de configuración `config.js` con tus datos.
* Iniciar con `node index`.

## Los endpoints disponibles son:
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
> Elimina el producto con el id aportado.  
> Require el header `Authorization` con el valor access_token.  
* PUT /product/:id
> Actualiza el producto con el id aportado.  
> Require el campo name.  
> Acepta el campo opcional description.  
> Require el header `Authorization` con el valor access_token.  

## TODOs:
- [ ] Implementar autentificación con oath 2
- [x] Implementar y configurar JSDocs
- [ ] Documentar toda la API
- [x] Añadir y configurar JOI
- [ ] Añadir y configurar logs con Winston
- [ ] Añadir seguridad helmet y más
- [ ] Crear test Jest
