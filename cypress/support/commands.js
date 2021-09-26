// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createOng", () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: "Pets mais Queridos",
            email: "mais-queridos@pets.com",
            whatsapp: "22222222222",
            city: "Nova Friburgo ",
            uf: "RJ"
        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdOngId', response.body.id);
    });
})

Cypress.Commands.add("login", () => {
    cy.visit('http://localhost:3000/profile', {
        onBeforeLoad: (navegador) => {
            navegador.localStorage.setItem('ongId', Cypress.env('createdOngId'));
            navegador.localStorage.setItem('ongName', 'Pets mais Queridos');
        }
    });
})

Cypress.Commands.add("createNewIncident", () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/incidents',
        headers: {'Authorization': `${Cypress.env('createdOngId')}`},
        body: {
            title: "Caso de Pete Perdido",
            description: "Foi notificado que existe um Pet perdido no centro",
            value: "222"
        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdIncidentId', response.body.id);
    })
})