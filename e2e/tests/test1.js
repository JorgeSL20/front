import { Selector } from 'testcafe';

// Configura el fixture y la página inicial
fixture `Verificación de URL`
    .page `https://clincicadental.netlify.app/#/`; // Cambia esta URL según sea necesario

// Define un test
test('Verifica que la página carga correctamente', async t => {
    // Obtiene la URL actual
    const currentUrl = await t.eval(() => window.location.href);

    // Verifica que la URL actual es la esperada
    await t.expect(currentUrl).eql('https://gateway-soluciones.netlify.app/#/'); // Cambia la URL si es necesario
});