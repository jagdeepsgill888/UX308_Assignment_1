import { Order } from '../Order.js'

describe("Tests all stages of an order", function() {
    it("test hello", function() {
        const oOrder = new Order("999-999-9999");
        const aResults = oOrder.handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Friday's Cafe.")
    });
 it("test number option", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("1");
        expect(aResults[0]).toBe("Great choice! Power Up Breakfast Bagel has been added.")
    });
    it("test non number entry", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("pizza");
        expect(aResults[0]).toBe("Sorry, we only offer Power Up or Asiago bagels for breakfast.")
    });
    it("test  topping", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("1");
        const aResults2 = oOrder.handleInput("yes");
        expect(aResults2[0]).toBe("Definitely! Extra bacon has been added.")
    });
    it("test  size", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("1");
        const aResults2 = oOrder.handleInput("yes");
        const aResults3 = oOrder.handleInput("regular");
        expect(aResults3[0]).toBe("Absolutely! A regular-sized bagel.")
    });
    it("test upselling drinks", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("1");
        const aResults2 = oOrder.handleInput("yes");
        const aResults3 = oOrder.handleInput("regular");
        const aResults4 = oOrder.handleInput("no");
        expect(aResults4[0]).toBe("No worries, your order will only include the bagel.")
    });
    it("test confirmation", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello")
        const aResults = oOrder.handleInput("1");
        const aResults2 = oOrder.handleInput("yes");
        const aResults3 = oOrder.handleInput("regular");
        const aResults4 = oOrder.handleInput("no");
        const aResults5 = oOrder.handleInput("yes");
        expect(aResults5[0]).toBe("Thank you! Your order has been confirmed.")
    });
  });
  
  