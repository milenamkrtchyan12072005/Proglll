var LivingCreature = require("./LivingCreature.js")
var random = require("./random")
module.exports = class eater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    getNewDirection() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
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
            if (empty && this.energy > 4) {
                eaterStatics++
                var newX = empty[0];
                var newY = empty[1];
                matrix[newY][newX] = 4;
                var am = new eater(newX, newY);
                eaterArr.push(am)
            }
        }
    }
    move() {
        var array = this.chooseCell(0);
        var empty = array[Math.floor(Math.random() * array.length)];
        this.energy -= 2
        if (empty) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var found1 = this.chooseCell(1)
        var found2 = this.chooseCell(3)
        var cord1 = found1.concat(found2)
        var cord = random(cord1)

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            let c = matrix[y][x];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;
            if (c == 3) {
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
            else if (c == 1) {

                for (var i in GrassArr) {
                    if (x == GrassArr[i].x && y == GrassArr[i].y) {
                        GrassArr.splice(i, 1);

                    }
                    //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
                    //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr

                    //եթե պատրաստ է բազմացմանը, բազմանում է 


                }
            }
        }


    }
    //mul() բազմանալ
    mul() {
        if (this.multiply >= 8) {
            //փնտրում է դատարկ տարածք
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);

            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ

            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //եթե կա բազմանում է
                if (cord) {
                    var x = cord[0];
                    var y = cord[1];
                    // this.multiply++;
                    //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
                    //և տեղադրում է այն խոտակերների զանգվածի մեջ
                    var norEater = new Eater(x, y);
                    eaterArr.push(norEater);

                    //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
                    matrix[y][x] = 4;
                    // this.multiply = 0; //????????
                }

            }
        }
    }
    //die() մահանալ
    die() {
        if (this.energy <= 0) {
            //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
            matrix[this.y][this.x] = 0;

            //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
            for (var i in eaterArr) {
                if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                }
            }
        }
    }
}