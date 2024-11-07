import { Selector } from 'testcafe';

// Configura el fixture y la página inicial
fixture`Formulario de Registro`
    .page`https://gateway-soluciones.netlify.app/#/registro`; // Cambia esta URL según sea necesario

// Define un test
test('Completa el formulario de registro y verifica mensajes de error', async t => {
    // Selecciona los campos del formulario
    const nameInput = Selector('#campo1');
    const lastNamePInput = Selector('#campoApellidoPaterno');
    const lastNameMInput = Selector('#campoApellidoMaterno');
    const emailInput = Selector('#campoEmail');
    const passwordInput = Selector('#password');
    const password2Input = Selector('#contrasena2');
    const preguntaSelect = Selector('#campoPregunta');
    const respuestaInput = Selector('#campoRyyespuesta');
    const termsCheckbox = Selector('#checkboxTerminos');
    const submitButton = Selector('button').withText('Crear cuenta');

    // Intenta enviar el formulario sin llenar los campos
    await t
        .click(submitButton)
        .expect(nameInput.parent('.error-message').withText('Nombre es un campo obligatorio.').exists).ok()
        .expect(lastNamePInput.parent('.error-message').withText('El campo es obligatorio.').exists).ok()
        .expect(lastNameMInput.parent('.error-message').withText('El campo es obligatorio.').exists).ok()
        .expect(emailInput.parent('.error-message').withText('El campo es obligatorio.').exists).ok()
        .expect(passwordInput.parent('.error-message').withText('El campo es obligatorio.').exists).ok()
        .expect(password2Input.parent('.error-message').withText('El campo es obligatorio.').exists).ok()
        .expect(termsCheckbox.parent('.invalid-feedback').withText('Debes aceptar los términos y condiciones.').exists).ok();

    // Llenar los campos correctamente y verificar que los errores desaparecen
    await t
        .typeText(nameInput, 'Juan')
        .typeText(lastNamePInput, 'Pérez')
        .typeText(lastNameMInput, 'González')
        .typeText(emailInput, 'juan@example.com')
        .typeText(passwordInput, 'Password123!')
        .typeText(password2Input, 'Password123!')
        .click(preguntaSelect)
        .click(preguntaSelect.find('option').withText('¿Lugar Favorito?'))
        .typeText(respuestaInput, 'Playa')
        .click(termsCheckbox)
        
        // Verifica que los mensajes de error ya no aparecen después de llenar los campos
        .expect(nameInput.parent('.error-message').exists).notOk()
        .expect(lastNamePInput.parent('.error-message').exists).notOk()
        .expect(lastNameMInput.parent('.error-message').exists).notOk()
        .expect(emailInput.parent('.error-message').exists).notOk()
        .expect(passwordInput.parent('.error-message').exists).notOk()
        .expect(password2Input.parent('.error-message').exists).notOk()
        .expect(termsCheckbox.parent('.invalid-feedback').exists).notOk();

    // Nota: Puedes simular el clic en el botón de envío solo si el reCAPTCHA está resuelto.
    // Para efectos de prueba, asumimos que el botón de enviar ya está habilitado al cumplir todos los requisitos.
});
