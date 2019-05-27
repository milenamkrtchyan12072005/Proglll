var LivingCreature = require("./LivingCreature.js")
var random = require("./random.js")
module.exports = class Eatgrass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 7;
    }
    getNewDirection() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewDirection();
        return super.chooseCell(character);
    }
    mul() {
        if (this.multiply >= 10) {
            var array = this.chooseCell(0);
            var empty = array[Math.floor(Math.random() * array.length)];
            if (empty) {
                Eatgrassstatics++
                var newX = empty[0];
                var newY = empty[1];
                matrix[newY][newX] = 2;
                var neXt = new Eatgrass(newX, newY);
                EatgrassArr.push(neXt)
            }
            this.multiply = 0;
        }
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in GrassArr) {
                if (x == GrassArr[i].x && y == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 

        }
    }

    //mul() բազմանալ
    move() {
        var array = this.chooseCell(0);
        var empty = random(array);
        this.energy--;
        if (empty) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    //die() մահանալ
    die() {
        if (this.energy <= 0) {
            //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
            matrix[this.y][this.x] = 0;

            //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
            for (var i in EatgrassArr) {
                if (this.x == EatgrassArr[i].x && this.y == EatgrassArr[i].y) {
                    EatgrassArr.splice(i, 1);
                }
            }
        }
    }

}



