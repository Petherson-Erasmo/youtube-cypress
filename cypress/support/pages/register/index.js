const element = require('./elements').ELEMENTS;

class Register {
    acessarCadastro(){
        cy.visit('http://localhost:3000/register');
    }

    preencherCadastro(){
        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get(element.name).type('Pet queridos');
        cy.get(element.email).type('meu_pet@querido.com');
        cy.get(element.whatsapp).type('22911223344');
        cy.get(element.city).type('Nova Friburgo');
        cy.get(element.uf).type('RJ');

        // routing
        // start server com cy.server()
        // criar uma rota com cy.route()
        // atribuir rota a um alias
        // esperar com cy.wait e fazer uma validação

        // cy.server();
        cy.route('POST', '**/ongs').as('postOngs');

        cy.get(element.submit).click();
    }

    validarCadastroComSucesso(){
        cy.wait('@postOngs').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }
}

export default new Register();
