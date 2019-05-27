var LivingCreature = require("./LivingCreature.js")
var random = require("./random")

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.energy = 6;
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 2) {
            GrassStatics++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            GrassArr.push(grass);
            this.multiply = 0;
        }
    }

}
