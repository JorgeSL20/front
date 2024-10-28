# Gateway Soluciones en TI - PWA

## Descripción del Proyecto
Gateway Soluciones en TI es una tienda en línea especializada en productos electrónicos. Esta Progressive Web Application (PWA) tiene como objetivo mejorar la experiencia de los usuarios, aumentando la retención y conversión de clientes mediante el acceso rápido y offline, notificaciones push y una interfaz optimizada para dispositivos móviles. La aplicación también incluye características avanzadas como un carrito de compras sincronizado, un proceso de pago fluido y seguro, y funcionalidades offline para garantizar una experiencia continua en cualquier circunstancia.

## Objetivos

### Mejorar la Experiencia de Usuario
- **Acceso Rápido y Offline:** Permitir a los usuarios acceder a la tienda incluso sin conexión o con una conexión lenta, almacenando páginas y productos previamente cargados.
- **Interfaz Fluida y Rápida:** Minimizar los tiempos de carga para una experiencia rápida, similar a una aplicación nativa.
- **Compatibilidad con Dispositivos Móviles:** La tienda será completamente responsive, ofreciendo una interfaz fácil de usar en cualquier dispositivo.

### Aumentar la Retención de Clientes
- **Notificaciones Push:** Mantener a los clientes informados sobre ofertas, promociones, nuevos productos y actualizaciones sobre sus pedidos.
- **Instalación en Pantalla de Inicio:** Facilitar la instalación de la tienda como una aplicación en dispositivos móviles, accesible desde la pantalla de inicio.
- **Engagement Constante:** Ofrecer ventajas exclusivas a usuarios que instalen la PWA, como descuentos o acceso anticipado a promociones.

### Incrementar la Conversión de Ventas
- **Rendimiento Optimizado:** Asegurar que la tienda funcione rápido, incluso en dispositivos de bajo rendimiento, para evitar abandonos de compra.
- **Check-out Fluido y Seguro:** Un proceso de compra optimizado para que los usuarios puedan completar transacciones en pocos clics.
- **Recuperación de Carritos Abandonados:** Uso de notificaciones push para recordar a los usuarios sobre productos dejados en el carrito.

## Funcionalidades Principales

### Visualización de Productos
- Listado completo de productos electrónicos con imágenes, descripciones, precios y disponibilidad.
- Filtros avanzados por categorías, marcas, precios, y otros atributos.
- Búsqueda rápida para encontrar productos específicos.

### Carrito de Compras
- Agregar, modificar y eliminar productos del carrito.
- Visualización del carrito con precios actualizados en tiempo real.
- Sincronización del carrito entre dispositivos para usuarios registrados.

### Proceso de Pago
- Soporte para múltiples métodos de pago, como PayPal y tarjetas de crédito/débito.
- Resumen de la compra antes del pago.
- Confirmación de la compra y envío de factura al correo del cliente.

### Instalación y Acceso Offline
- Posibilidad de instalar la aplicación en la pantalla de inicio de dispositivos móviles o de escritorio.
- Funcionalidad offline para ver productos previamente cargados y realizar compras cuando se recupere la conexión.

## Equipo
- **Erik Uriel Vicente Sanchez** (Desarrollador Principal)
- **Jorge Leonardo Seydlitz Lugo** (Tester)

## Riesgos y Medidas

### Riesgos
- Problemas de seguridad en el pago con PayPal y Mercado Pago.
- Fallos de sincronización con la base de datos.
- Retrasos en la implementación.

### Medidas
- Integración continua de pruebas con Postman.
- Revisiones regulares del código en GitHub.
- Evaluación continua de seguridad.

## Metodología de Desarrollo
- **Metodología:** XP (Extreme Programming)
  - Iteraciones rápidas y retroalimentación constante.
  - Capacidad de adaptación rápida a los cambios y mejoras continuas.
- **Herramienta de Planeación:** Trello
  - El proyecto será gestionado mediante tableros en Trello, divididos en:
    - **Backlog:** Tareas pendientes por iniciar.
    - **In Progress:** Tareas en proceso de desarrollo.
    - **Review:** Tareas que están siendo revisadas por desarrolladores o testers.
    - **Done:** Tareas completadas, revisadas y listas.

## Documentación
Toda la documentación relacionada con los objetivos, alcance, riesgos, metodología y roles del equipo se encuentra en la sección “Aspectos clave” de Trello.

## Requisitos para la PWA
- **HTTPS obligatorio:** Garantizar la seguridad de los usuarios en cada transacción.
- **Service Workers:** Para garantizar la funcionalidad offline y la actualización automática de contenido.
- **Manifest.json:** Configuración de la PWA para la instalación en la pantalla de inicio y la personalización del ícono de la app.

## Alcance del Proyecto

### Funcionalidades Principales:
- Visualización de productos electrónicos con imágenes, precios y descripciones.
- Carrito de compras con sincronización en tiempo real.
- Proceso de pago seguro con integración de pasarelas como PayPal.
- Funcionalidad offline para ver productos previamente cargados.

### Mejoras en la Experiencia de Usuario:
- Notificaciones push para mantener a los usuarios informados.
- Instalación en la pantalla de inicio para acceso rápido.

### Seguridad y Privacidad:
- Toda la comunicación será cifrada con HTTPS.
- Autenticación segura mediante tokens y roles para los usuarios.

### Mantenimiento y Actualizaciones:
- Actualizaciones automáticas sin necesidad de que los usuarios descarguen versiones manualmente.
- Monitoreo continuo del rendimiento y la accesibilidad con herramientas como Google Lighthouse.

## Documentación Técnica y Procedimientos Adicionales

### Control de Versiones y Flujo de Trabajo
Se ha documentado la herramienta de control de versiones seleccionada (Git) y el flujo de trabajo para su uso. Este flujo de trabajo incluye:

#### Ramas principales:
- **main:** rama de producción con el código estable.
- **develop:** rama de desarrollo, donde se integran las nuevas funcionalidades y correcciones antes de ser fusionadas en main.

#### Ramas de características:
- Se crea una nueva rama para cada característica o corrección, siguiendo el esquema `feature/nombre-feature` o `fix/nombre-bug`.

### Estrategia de Versionamiento y Gestión de Ramas
El proyecto sigue una estrategia de versionamiento semántico (vX.Y.Z):
- **X:** Cambios mayores que rompen la compatibilidad.
- **Y:** Nuevas características que no rompen la compatibilidad.
- **Z:** Correcciones y ajustes menores.

### Estrategia de Despliegue
El proyecto utiliza un enfoque de CI/CD para su despliegue:

#### Entornos de despliegue:
- **Testing:** Entorno de pruebas para validar funcionalidades.
- **Producción:** Entorno en el que los usuarios finales interactúan con la aplicación.

#### Proceso de CI/CD:
- Al realizar un commit en la rama main, se ejecuta un pipeline de CI/CD que despliega automáticamente los cambios en producción.

## Instrucciones de Configuración del Proyecto

### Clonación del repositorio:
git clone <URL_del_repositorio>
npm install
npm start
