// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://gateway-soluciones.netlify.app/#/', // Cambia esto a la URL de tu aplicación en el entorno de prueba
  },
})
