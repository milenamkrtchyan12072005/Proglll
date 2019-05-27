var LivingCreature = require("./LivingCreature.js")
var random = require("./random")
module.exports = class predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
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
    mult() {
        if (this.multiply == 10) {
            var array = this.chooseCell(0);
            var empty = array[Math.floor(Math.random() * array.length)];
            if (empty && this.energy > 5) {
                predatorStatics++
                var newX = empty[0];
                var newY = empty[1];
                matrix[newY][newX] = 3;
                var xr = new predator(newX, newY);
                predatorArr.push(xr)
            }
        }
    }
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.chooseCell(0);
        // var fundCords2 = this.getNewDirection(1);
        // var fundCords = fundCords1.concat(fundCords2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy += 10;
            for (var i in eaterArr) {
                if (x == eaterArr[i].x && y == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                }
            }
        }
        //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
        //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr

        //եթե պատրաստ է բազմացմանը, բազմանում է 
    }

    //die() մահանալ
    die() {
        if (this.energy <= 0) {
            //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
            matrix[this.y][this.x] = 0;

            //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);

                }
            }
        }
    }
}
