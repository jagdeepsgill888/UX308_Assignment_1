export class Order {
    constructor(sFrom) {
      this.OrderState = {
        WELCOMING: () => {
          let aReturn = [];
          this.stateCur = this.OrderState.SELLING;
          aReturn.push("Welcome to Friday's Cafe.");
          aReturn.push("What would you like to order for breakfast today?");
          aReturn.push("Our all day breakfast menu options are");
          aReturn.push("Asiago Breakfast Bagel (S/M/L)");
          aReturn.push("Power Up Breakfast Bagel (S/M/L)");
          return aReturn;
        },

       SELLING: (sInput) => {
          let aReturn = [];
          this.stateCur = this.OrderState.UPSELLING;
          if (sInput.includes('Power up')) {
            aReturn.push(`Would you like toppings such as bacon for your order?`);
          } else if (sInput.toLowerCase().includes('asiago')){
              aReturn.push(`Would you like to add extra cheese to your order?`);
          } else {
            aReturn.push(`Sorry we only offer Power Up or Asiago' bagels for breakfast bagels`);
            this.stateCur = this.OrderState.SELLING;
          }
          return aReturn;
        }, 

        UPSELLING: (sInput) => {
          let aReturn = [];
          this.stateCur = this.OrderState.CONFIRM;
          if (sInput.toLowerCase().includes('yes')) {
            aReturn.push(`Would you like to add a regular coffee to this order?`);
          } else {
            aReturn.push(`No worries, this order will only consist of a bagel`);
          }
          return aReturn;
        }, 

        CONFIRM: (sInput) => {
          let aReturn = [];
          this.stateCur = this.OrderState.RESERVING;
          if (sInput.toLowerCase().includes('yes')) {
            aReturn.push(`Thank you!! Is that everything for today?`);
          }
          return aReturn;
        }, 

        RESERVING: (sInput) => {
          let aReturn = [];
          this.isDone = true;
          if (sInput.toLowerCase().startsWith('yes')) {
            aReturn.push(`Your breakfast order is reserved under the phone number ${this.sFrom}`);
            let d = new Date();
            d.setMinutes(d.getMinutes() + 120);
            aReturn.push(`Please pick it up at 75 Dalhousie St before ${d.toTimeString()}`);
          } else {
            aReturn.push("Thanks for trying Friday's Cafe SMS ordering!");
            aReturn.push("Have a great day")
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
    isDone() {
      return this.isDone;
    }
  }