describe('Add new Snack', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })
  it('Passed in smartphone', () => {
    const name = "Coca Cola 350ml";
    const price = "1000";
    const description = "Lata de Coca Cola de 350ml"
    const imageLink = "https://media.istockphoto.com/id/458464735/es/foto/coca-cola.jpg?s=612x612&w=0&k=20&c=SnB7NqAiTxs3PQzWpSpwOiOncP1hbYHEP9zaDurvLwU=";
    
    cy.viewport(426,926);
    
    cy.wait(800);
    cy.get(".btn-menu").wait(300).click();
    cy.get(".btn-login").wait(500).click();
    
    cy.get('input[type="email"]').type("manager@gmail.com", { delay: 70 });
    cy.get('input[type="email"]').should('have.value', 'manager@gmail.com');
    
    cy.get('input[type="password"]').type("manager", { delay: 70 });
    cy.get('input[type="password"]').should("have.value", "manager");

    cy.get('button[type="submit"]').click();
    cy.wait(800);
    cy.location('pathname').should('eq', '/manager-home');
    
    cy.get("button").contains("Productos").click()
    cy.wait(800);
    cy.get("button").contains("Agregar Nuevo Producto").click()
    
    cy.get("input[formcontrolname='name']").type(name,{delay: 50});
    cy.get("input[formcontrolname='name']").should("have.value", name);
    cy.get("input[formcontrolname='price']").type(price,{delay: 50});
    cy.get("input[formcontrolname='price']").should("have.value", price);
    cy.get("textarea[formcontrolname='description']").type(description,{delay: 50});
    cy.get("textarea[formcontrolname='description']").should("have.value", description);
    cy.get("textarea[formcontrolname='urlPhoto']").type(imageLink,{delay: 5});
    cy.get("textarea[formcontrolname='urlPhoto']").should("have.value", imageLink);
    
    cy.get("button[type='submit']").click();
  })
})