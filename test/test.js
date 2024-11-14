import { Selector } from 'testcafe';

fixture('Prueba de carga del sitio web')
  .page('https://gateway-soluciones.netlify.app/#/');

// Verifica que la página cargue correctamente con la URL
test('La página debería cargar sin errores', async t => {
  // Verifica que un elemento genérico esté presente para confirmar que la página se cargó
  const body = Selector('body');
  
  // Asegura que la etiqueta <body> existe, indicando que la página ha cargado
  await t.expect(body.exists).ok('La página no se ha cargado correctamente');
});
