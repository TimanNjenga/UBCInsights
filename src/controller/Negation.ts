

import Filter from "./Filter";
import Body from "./Body";

export default class Negation extends Filter {
//new change here
    filter : Filter;
    comp : string;

    constructor(negation : any){
        super();
        try {
            this.comp = "NOT";
            this.filter = Body.makeFilter(Negation.getFilter(negation));
        } catch (err) {
            throw err;
        }
    }

    static getFilter(filter : any){


        var oArr : any[] = Object.keys(filter);

        if(oArr[0] === "NOT") {
            var filterKey = oArr[0];
            var filter = filter[filterKey];
            return filter;
        } else {
            throw "getFilter err"}
    }

    evaluate(courseObject : any) : boolean {

        if(this.filter.evaluate(courseObject)){
            return false;
        } else{return true;}
    }
}
