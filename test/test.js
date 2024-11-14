import { Selector } from 'testcafe';

fixture('Prueba de existencia de la página')
  .page('https://gateway-soluciones.netlify.app/#/');

test('La página carga correctamente', async t => {
  // Espera a que la página cargue completamente
  await t.expect(Selector('body').exists).ok('La página no se cargó correctamente');
  
  // Verifica que el título de la página sea el esperado
  const pageTitle = await t.eval(() => document.title);
  await t.expect(pageTitle).eql('Gateway Soluciones en TI', 'El título de la página no coincide, lo que sugiere que la página no se cargó como se esperaba');
});
