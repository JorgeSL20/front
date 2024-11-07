// cypress/e2e/home.spec.js
describe('Página principal', () => {
    it('Debería cargar la página de inicio', () => {
      cy.visit('https://gateway-soluciones.netlify.app/#/')      
      cy.contains('Detalles') 
    })
  })