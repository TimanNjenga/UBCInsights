

import Filter from "./Filter";
import LogicComparison from "./LogicComparison";
import MComparison from "./MComparison";
import Negation from "./Negation";
import SComparison from "./SComparison";

export default class Body  {
    filter : Filter;
//new change here
    constructor(body : any){

        try{
            this.filter = Body.makeFilter(Body.getFilter(body));
        }catch(err){

            throw err;
        }


    }

    static getFilter(body : any){


        var oArr : any[] = Object.keys(body);

        if(oArr[0] === "WHERE") {
            var filterKey = oArr[0];
            var filter = body[filterKey];
            return filter;
        } else {
            throw "getFilter err"}
    }

    static makeFilter(filter : Filter){

        var fArr : any[] = Object.keys(filter);

        if(Filter.isLogicComparison(fArr[0])){
            return new LogicComparison(filter);
        }
        if(Filter.isMComparison(fArr[0])){
            return new MComparison(filter);
        }
        if(Filter.isNegation(fArr[0])){
            return new Negation(filter);
        }
        if(Filter.isSComparison(fArr[0])){
            return new SComparison(filter);
        } else {throw "make filter error"}
    }

    evaluate(courseObject : any) : boolean {


        if(Filter.isSComparison(this.filter.comp) || Filter.isMComparison(this.filter.comp)){
            return this.filter.evaluate(courseObject);
        }

        if(Filter.isNegation(this.filter.comp)){
            return this.filter.evaluate(courseObject);
        }

        if(Filter.isLogicComparison(this.filter.comp)){
            return this.filter.evaluate(courseObject);

        }
    }

}





