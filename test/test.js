import { Selector } from 'testcafe';

fixture('Pruebas de carrito de compras')
  .page('https://gateway-soluciones.netlify.app/#/'); // URL de la aplicación en producción

test('Buscar "audifonos", ver detalles y añadir al carrito', async t => {
  // Selector de la barra de búsqueda y del botón de buscar
  const searchBar = Selector('input[type="search"]');
  const searchButton = Selector('button').withText('Buscar');
  
  // Selector de la tarjeta del producto y los botones de detalle y añadir al carrito
  const productTitle = Selector('.card-title').withText('audifonos');
  const detailButton = productTitle.parent('.card-body').find('button').withText('Detalles');
  const closeModalButton = Selector('.modal-footer button').withText('Cerrar'); // Ajusta según tu modal
  const addToCartButton = productTitle.parent('.card-body').find('button').withText('Añadir al carrito');

  // Realizar búsqueda de "audifonos"
  await t
    .typeText(searchBar, 'audifonos')
    .click(searchButton);

  // Verificar que el producto esté visible después de la búsqueda
  await t.expect(productTitle.exists).ok('El producto "audifonos" no fue encontrado');

  // Clic en el botón de detalles
  await t.click(detailButton);

  // Esperar a que se abra el modal y verificar
  const modal = Selector('.modal'); // Asegúrate de que este selector coincida con tu modal de detalles
  await t.expect(modal.exists).ok('El modal de detalles no se abrió');

  // Cerrar el modal
  await t.click(closeModalButton);
  await t.expect(modal.exists).notOk('El modal de detalles no se cerró correctamente');

  // Clic en el botón "Añadir al carrito", que debe llevar al usuario a la página de login
  await t.click(addToCartButton);

  // Verificar que estamos en la página de login
  const loginPageTitle = Selector('h1').withText('Login'); // Ajusta según el contenido de la página de login
  await t.expect(loginPageTitle.exists).ok('No se redirigió a la página de login');
});
