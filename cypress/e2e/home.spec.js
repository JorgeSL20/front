// cypress/e2e/home.spec.js
describe('Página principal', () => {
    it('Debería cargar la página de inicio', () => {
      cy.visit('https://gateway-soluciones.netlify.app/#/')               // Visita la URL base definida en `cypress.config.js`
      cy.contains('Detalles')       // Verifica que contenga algún texto específico
    })
  })