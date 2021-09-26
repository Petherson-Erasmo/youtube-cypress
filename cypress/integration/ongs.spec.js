/// <reference types="cypress" />

import Login from '../support/pages/login';
import Register from '../support/pages/register';
import Profile from '../support/pages/profile';
import NewIncident from '../support/pages/newIncident';

describe('Ongs', () => {
    it('devem poder realizar um cadastro', () => {
        
        Register.acessarCadastro(); 
        Register.preencherCadastro();
        Register.validarCadastroComSucesso();

    });

    it('deve poder realizar um login no sistema', () => {
        // const createOngId = Cypress.env('createdOngId');
        // cy.log(createOngId);

        Login.acessarLogin();
        Login.preencherLogin();
    });

    it('deve poder fazer logout', () => {
        // a ação de login está no commands
        cy.login();
        Profile.clicarNoBotaoLogout();
    });

    it('deve cadastrar novos casos', () => {
        // a ação de login está no commands
        cy.login();

        Profile.clicarEmCadastrarNovoCaso();

        NewIncident.preencherCadastroDeCasos();
        NewIncident.validarCadastroDeCaso();

    });

    it('deve poder excluir um casos', () => {
        cy.createNewIncident();
        cy.login();

        Profile.clicarNoBotaoExcluirCaso();
        Profile.validarExclusaoDeCasoComSucesso();
    });
});

// ec61969f