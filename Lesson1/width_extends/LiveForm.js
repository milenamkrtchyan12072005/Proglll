// LiveForm.js 

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

export default LiveForm;