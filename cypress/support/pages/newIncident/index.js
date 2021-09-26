const element = require('./elements').ELEMENTS;

class NewIncident {
    preencherCadastroDeCasos(){
        cy.get(element.title).type('Pet abandonado');
        cy.get(element.textarea).type('Foi encontrado um Pet abandonado, perto do poste logo ali depois daquela parada.');
        cy.get(element.value).type('6600');

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get(element.buttonSave).click();
    }

    validarCadastroDeCaso(){
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
}

export default new NewIncident();
