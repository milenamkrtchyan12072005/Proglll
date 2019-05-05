 class DamnDog extends LiveForm {
    energy = 20;
    constructor(x, y, ind) {
        super(x, y, ind);
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]


            // [this.x - 2, this.y - 2],
            // [this.x, this.y - 2],
            // [this.x + 2, this.y - 2],
            // [this.x - 2, this.y],
            // [this.x + 2, this.y],
            // [this.x - 2, this.y + 2],
            // [this.x, this.y + 2],
            // [this.x + 2, this.y + 2]


        ];
    }

    getDirections(eg, pd) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            // console.log('x = ', x);
            // console.log('y = ', y);
            // console.log('matrix.length = ', matrix.length);
            // console.log('matrix[0].length = ', matrix[0].length);

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == eg || matrix[y][x] == pd) {
                    found.push(this.directions[i]);
                    // console.log('this.directions[i] = ', this.directions[i]);

                }
            }
        }
        if (found.length == 1) {
            console.log('found = ', found);
        }

        return found;
    }

    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0,1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(2, 3);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան 2 - ով
            this.energy += 2;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //գիշատիչների համար դա խոտակերն է, խոտակերների զանգվածի մեջ eatArr
            for (var i in predArr) {
                if (x == predArr[i].x && y == predArr[i].y && x == eatArr[i].x && y == eatArr[i].y) {
                    predArr.splice(i, 1);
                    eatArr.splice(i, 1);
                    break;
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply > 20) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy -= 2;
            if (this.energy < 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ գիշատիչ)
            //և տեղադրում է այն գիշատիչների զանգվածի մեջ
            var newDamnDog = new DamnDog(x, y, this.index);
            damnArr.push(newDamnDog);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն գիշատիչների զանգվածից
        for (var i in damnArr) {
            if (this.x == damnArr[i].x && this.y == damnArr[i].y) {
                damnArr.splice(i, 1); // գիշատիչների զանգվածից հանում է i երրորդ տարրը , այսինքն 1 հատ գիշատիչ է հանում
                break; // ցիկլը կանգնում է
            }
        }
    }
}