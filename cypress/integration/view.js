import { setupBeforeEach, tearDownAfterEach } from '../support';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .clear()
      .type('My Add-on Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Add-on Page');

    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
      '{enter}',
    );

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.leafletMap')
      .contains('Leaflet map')
      .click();

    cy.get('#field-latitude').first().clear().type('50.45');
    cy.get('#field-longitude').first().clear().type('4.85');
    cy.get('#field-zoom').first().clear().type('12');
    cy.intercept('https://c.tile.openstreetmap.org/**').as('OSM');
    cy.wait('@OSM');
    cy.get('.leaflet-tile.leaflet-tile-loaded')
      .first()
      .should('have.attr', 'src')
      .should('not.be.empty')
      .and('contain', 'tile.openstreetmap.org');

    cy.get('.add-item-button-wrapper .button').contains('Add Marker').click();

    cy.get('#field-title-0-markers-0').type('MyMarker');
    cy.get('#field-latitude-1-markers-0').type('50.45');
    cy.get('#field-longitude-2-markers-0').type('4.85');

    cy.get('.leaflet-marker-icon.leaflet-div-icon')
      .first()
      .children()
      .should('have.length', 1);

    cy.get('[name="parking"] > .icon').click();
    cy.get(
      '.leaflet-marker-icon > svg > [d="M18,35.2C9.7,24.9,5.6,17.5,5.6,12.9C5.6,6.1,11.2,0.5,18,0.5c6.8,0,12.4,5.6,12.4,12.4\tC30.4,17.5,26.3,24.9,18,35.2z"]',
    ).should('be.visible');
  });
});
