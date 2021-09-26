/// <reference types="cypress" />

describe('Ongs', () => {
    it.skip('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get('[data-cy=name]').type('Pet queridos');
        cy.get('[data-cy=email]').type('meu_pet@querido.com');
        cy.get('[data-cy=whatsapp]').type('22911223344');
        cy.get('[data-cy=city]').type('Nova Friburgo');
        cy.get('[data-cy=uf]').type('RJ');

        // routing
        // start server com cy.server()
        // criar uma rota com cy.route()
        // atribuir rota a um alias
        // esperar com cy.wait e fazer uma validação

        // cy.server();
        cy.route('POST', '**/ongs').as('postOngs');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOngs').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    });

    it('deve poder realizar um login no sistema', () => {

        // const createOngId = Cypress.env('createdOngId');

        // cy.log(createOngId);

        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });
});