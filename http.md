Acciones: Seguras, idempotentes, cacheables.
    - Segura: Operaciones que no modifiquen el contenido del navegador, acciones de lecturas.
    - Idempotentes: la misma accion varias veces seguidas y el mismo estado resultanres.
    - Cacheables: el usuario puede guardar el resultado.
GET:
Lectura de un recurso. Es seguro, cacheable.

HEAD:
No me da respuesta, pero es el mismo que GET.

POST:
Crear nuevos recursos o nuevas entidades, genera un cambio en el servidor, no es seguro ni idempotente.

PUT: 
Similar a post, reemplaza todos los datos de un recurso.

DELETE: 
Elimina el recurso del servidor.

CONNECT:
Generar una conexion con el recurso que identifica.

OPTIONS:
Que opciones de comunicacion tiene.

TRACE:
Por donde pasa el mensaje hacia un recursos en concreto.

PATCH:
Se usa para modificaciones parciales, el PUT hace modificaciones totales.

PEDIR DATOS DE OTRA MANERA
url + ? + "limit=100" + & + "offset=0"
////////////////////////////////////////////////
Express es la libreria base para la API. npm install express
