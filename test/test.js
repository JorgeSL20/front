import { Selector } from 'testcafe';

fixture('Pruebas de renderizado de la interfaz de usuario')
  .page('https://gateway-soluciones.netlify.app/#/');

test('La página principal se renderiza correctamente', async t => {
  // Verifica que el título de la página se renderice
  const pageTitle = Selector('h1').withText('Gateway Soluciones en TI');
  await t.expect(pageTitle.exists).ok('El título de la página no se renderizó correctamente');

  // Verifica que el menú de navegación esté presente
  const navBar = Selector('nav');
  await t.expect(navBar.exists).ok('El menú de navegación no se renderizó correctamente');

  // Verifica que el botón de login esté presente en la interfaz
  const loginButton = Selector('button').withText('Iniciar sesión');
  await t.expect(loginButton.exists).ok('El botón de inicio de sesión no se encontró en la página');

  // Verifica que se renderice la sección de productos
  const productSection = Selector('.product-section');
  await t.expect(productSection.exists).ok('La sección de productos no se renderizó correctamente');
});

test('El footer se renderiza correctamente', async t => {
  // Verifica que el footer esté presente
  const footer = Selector('footer');
  await t.expect(footer.exists).ok('El footer no se renderizó correctamente');

  // Verifica que el footer contenga texto específico
  const footerText = footer.withText('Gateway Soluciones en TI');
  await t.expect(footerText.exists).ok('El texto en el footer no se encontró');
});

test('Los productos se cargan en la página', async t => {
  // Verifica que haya al menos un producto en la sección de productos
  const productItem = Selector('.product-item'); // Cambia el selector según la clase que uses para cada producto
  await t.expect(productItem.exists).ok('No se encontraron productos en la página');
});
