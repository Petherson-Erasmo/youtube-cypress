// Ações de interação com a pagina

const element = require('./elements').ELEMENTS;

class Login {
    acessarLogin(){
        cy.visit('http://localhost:3000/');
    }

    preencherLogin(){
        cy.get(element.id).type(Cypress.env('createdOngId'));
        cy.get(element.buttonLogin).click();
    }
}

export default new Login();