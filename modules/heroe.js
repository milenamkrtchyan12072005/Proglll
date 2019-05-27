var LivingCreature = require("./LivingCreature.js")
var random = require("./random")
module.exports = class damn extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 9;
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
    move() {
        var array = this.chooseCell(0);
        var empty = random(array)
        this.energy --
        if (empty) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var found1 = this.chooseCell(4)
        var found2 = this.chooseCell(2)
        var found3 = this.chooseCell(1)
        var cord1 = found1.concat(found2, found3);
        var cord = random(cord1)
        // if (this.multiply == 10) {
        //     this.mul()
        //     this.multiply = 0;
        // }
        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            let c = matrix[y][x];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;
            if (c == 4) {
                for (var i in eaterArr) {
                    if (x == eaterArr[i].x && y == eaterArr[i].y) {
                        eaterArr.splice(i, 1);
                    }
                }
            }
            else if (c == 2) {
                for (var i in EatgrassArr) {
                    if (x == EatgrassArr[i].x && y == EatgrassArr[i].y) {
                        EatgrassArr.splice(i, 1);
                    }
                }
            }
            else if (c == 1) {
                for (var i in GrassArr) {
                    if (x == GrassArr[i].x && y == GrassArr[i].y) {
                        GrassArr.splice(i, 1);


                        //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
                        //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr

                        //եթե պատրաստ է բազմացմանը, բազմանում է 


                    }
                }
            }
        }
    }

    //mul() բազմանալ
    mul() {
        if (this.multiply >= 8) {
            //փնտրում է դատարկ տարածք
            var fundCords = this.chooseCell(0);
            var cord = random(fundCords);
            damnstatics++;


            //եթե կա բազմանում է
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                // this.multiply++;
                //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
                //և տեղադրում է այն խոտակերների զանգվածի մեջ
                var nordamn = new damn(x, y);
                damnArr.push(nordamn);

                //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
                matrix[y][x] = 5;
                // this.multiply = 0; //????????
            }
        }

    }


    //die() մահանալ
    die() {
        if (this.energy <= 0) {
            //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
            matrix[this.y][this.x] = 0;

            //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
            for (var i in damnArr) {
                //   if (this.energy <=0 )

                if (this.x == damnArr[i].x && this.y == damnArr[i].y) {
                    damnArr.splice(i, 1);
                }

            }
        }
    }
}