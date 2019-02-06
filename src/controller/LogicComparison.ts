

import Filter from "./Filter";
import Body from "./Body";
import MComparison from "./MComparison";
import Negation from "./Negation";
import SComparison from "./SComparison";

export default class LogicComparison extends Filter {
    filterArray : any[] = [];
    comp : string;
//new change here

    constructor(logicComp : any){
        super();
       try {
            this.comp = LogicComparison.getLogic(logicComp);
            this.filterArray = LogicComparison.getFilters(logicComp);
            if(this.filterArray.length === 0){
                throw "Logic is empty";
            }
       } catch (err) {
            throw err;
        }
    }


     static getLogic(logicComp : any){
        var oArr : any[] = Object.keys(logicComp);
        return oArr[0];
    }



     static getFilters(logicComp : any){
        var newArray : any[] = [];

        var oArr : any[] = Object.keys(logicComp);


        //stops right below
        if(oArr[0] === "AND" || oArr[0] === "OR" ) {
            var logicCompKey = oArr[0];
            var logicCompArr = logicComp[logicCompKey];

            var logicLength = logicCompArr.length;

            for(var i = 0; i < logicLength; i++){
                let filter = Body.makeFilter(logicCompArr[i]);
                newArray.push(filter);
            }
            return newArray;

        } else {
            throw "getFilter LogicComp err"}
    }


    evaluate(courseObject : any) : boolean {
        if (this.comp === "AND") {
            for (var filter of this.filterArray) {
                if (!filter.evaluate(courseObject)) {
                    return false;
                }
            }
            return true;
        } else {

            if (this.comp === "OR") {
                for (var filter of this.filterArray) {
                    if (filter.evaluate(courseObject)) {
                        return true;
                    }
                }
                return false;
            }
        }
    }

}
