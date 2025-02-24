export class Order {
  constructor(sFrom) {
      this.OrderState = {
          WELCOMING: () => {
              let aReturn = [];
              this.stateCur = this.OrderState.SELLING;
              aReturn.push("Welcome to Friday's Cafe.");
              aReturn.push("What would you like to order for breakfast today?");
              aReturn.push("Our all-day breakfast menu options are:");
              aReturn.push("1. Power Up Breakfast Bagel");
              aReturn.push("2. Asiago Breakfast Bagel");
              aReturn.push("Please enter the option number");
              return aReturn;
          },

          SELLING: (sInput) => {
              let aReturn = [];
              if (sInput.includes('1')) {
                  aReturn.push(`Great choice! Power Up Breakfast Bagel has been added.`);
                  aReturn.push("Would you like bacon as a topping? (yes/no)");
                  this.stateCur = this.OrderState.TOPPING;
              } else if (sInput.includes('2')) {
                  aReturn.push(`Great choice! Asiago Breakfast Bagel has been added.`);
                  aReturn.push("Would you like bacon as a topping? (yes/no)");
                  this.stateCur = this.OrderState.TOPPING;
              } else {
                  aReturn.push(`Sorry, we only offer Power Up or Asiago bagels for breakfast.`);
              }
              return aReturn;
          },

          TOPPING: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().includes('yes')) {
                  aReturn.push(`Definitely! Extra bacon has been added.`);
              } else {
                  aReturn.push(`No problem! No extra toppings added.`);
              }
              aReturn.push("Would you like a regular or a large-sized bagel?");
              this.stateCur = this.OrderState.SIZE;
              return aReturn;
          },

          SIZE: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().includes('regular')) {
                  aReturn.push(`Absolutely! A regular-sized bagel.`);
                  this.stateCur = this.OrderState.UPSELLING;
              } else if (sInput.toLowerCase().includes('large')) {
                  aReturn.push(`Absolutely! A large-sized bagel.`);
                  this.stateCur = this.OrderState.UPSELLING;
              } else {
                  aReturn.push(`Sorry, we only offer sizes in regular or large.`);
                  return aReturn; // Stay in this state if input is invalid
              }
              aReturn.push("Would you like to add a regular coffee to this order? (yes/no)");
              return aReturn;
          },

          UPSELLING: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().includes('yes')) {
                  aReturn.push(`Great! A regular coffee has been added to your order.`);
              } else {
                  aReturn.push(`No worries, your order will only include the bagel.`);
              }
              aReturn.push("Is that everything for today? (yes/no)");
              this.stateCur = this.OrderState.RESERVING;
              return aReturn;
          },

          RESERVING: (sInput) => {
              let aReturn = [];
              this.isDone = true;

              if (sInput.toLowerCase().startsWith('yes')) {
                  aReturn.push(`Thank you! Your order has been confirmed.`);
                  aReturn.push(`Your breakfast order is reserved under the phone number ${this.sFrom}`);
                  let d = new Date();
                  d.setMinutes(d.getMinutes() + 120);
                  aReturn.push(`Please pick it up at 75 Dalhousie St before ${d.toTimeString()}`);
              } else {
                  aReturn.push("Thanks for trying Friday's Cafe SMS ordering!");
                  aReturn.push("Have a great day!");
              }
              return aReturn;
          }
      };

      this.stateCur = this.OrderState.WELCOMING;
      this.isDone = false;
      this.sFrom = sFrom;
  }

  handleInput(sInput) {
      return this.stateCur(sInput);
  }

  orderIsDone() {
      return this.isDone;
  }
}
