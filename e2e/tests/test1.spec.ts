import { Selector } from 'testcafe';

fixture `Mi primera prueba en Angular`
    .page `http://localhost:4200`;

test('Verificar título de la página', async t => {
    await t
        .wait(10000) // Esperar 10 segundos para asegurar que la página se cargue completamente
        .click(Selector('.Registrarse').nth(0)) // Simular clic en el primer elemento de la lista de productos
        .expect(Selector('.crear-cuenta').exists).ok();});
