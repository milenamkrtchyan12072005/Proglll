import LiveForm from "./LiveForm";

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
export default Grass;