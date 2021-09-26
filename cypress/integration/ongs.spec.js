/// <reference types="cypress" />

describe('Ongs', () => {
    it('devem poder realizar um cadastro', () => {
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
        cy.get('[data-cy=id]').type(Cypress.env('createdOngId'));
        cy.get('[data-cy=button-login]').click();
    });

    it('deve poder fazer logout', () => {
        // a ação de login está no commands
        cy.login();
        cy.get('button').click();
    });

    it('deve cadastrar novos casos', () => {
        // a ação de login está no commands
        cy.login();

        cy.get('.button').click();

        cy.get('[placeholder="Título do caso"]').type('Pet abandonado');
        cy.get('textarea').type('Foi encontrado um Pet abandonado, perto do poste logo ali depois daquela parada.');
        cy.get('[placeholder="Valor em reais"]').type('6600');

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('deve poder excluir um casos', () => {
        cy.createNewIncident();
        cy.login();

        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get('li > button > svg').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    });
});

// ec61969f