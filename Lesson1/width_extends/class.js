//Կենսաձև կլասը, որը նկարագրում է հիմնական հատկանիշները և մեթոդները, որոնք անհրաժեշտ են լինելու բոլոր մյուս էակներին
//էակները ժառանգելու են այս հատկանիշները և մեթոդները
class LiveForm {
    constructor(x, y, ind) {
        this.index = ind;
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
    }

    //շրջապատի հետազոտության մատրիցը
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
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
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
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                    // console.log('this.directions[i] = ', this.directions[i]);

                }
            }
        }
        // if (found.length == 1) {
        //     console.log('found = ', found);
        // }

        return found;
    }
}


//խոտի կլասը
class Grass extends LiveForm {
    constructor(x, y, ind) {
        super(x, y, ind);
    }

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 4) {

            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y, this.index);
                xotArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}


//խոտակերի կլասը
class Eatgrass extends LiveForm {
    constructor(x, y, ind) {
        super(x, y, ind);
    }

    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(1);
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
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                    break;
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply > 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
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

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norXotaker = new Eatgrass(x, y, this.index);
            eatArr.push(norXotaker);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 1;
            this.multiply = 0;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1); // խոտակերների զանգվածից հանում է i երրորդ տարրը , այսինքն 1 հատ խոտակեր է հանում
                break; // ցիկլը կանգնում է
            }
        }
    }

}

class Predator extends LiveForm {
    energy = 20;
    constructor(x, y, ind) {
        super(x, y, ind);
    }

    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
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
        var fundCords = this.getDirections(2);
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

            //մեծացնում է էներգիան 2 - ով
            this.energy += 2;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //գիշատիչների համար դա խոտակերն է, խոտակերների զանգվածի մեջ eatArr
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply > 15) {
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
            var newPredator = new Predator(x, y, this.index);
            predArr.push(newPredator);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն գիշատիչների զանգվածից
        for (var i in predArr) {
            if (this.x == predArr[i].x && this.y == predArr[i].y) {
                predArr.splice(i, 1); // գիշատիչների զանգվածից հանում է i երրորդ տարրը , այսինքն 1 հատ գիշատիչ է հանում
                break; // ցիկլը կանգնում է
            }
        }
    }
}





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