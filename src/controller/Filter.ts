

export default class Filter  {
    comp : string;
    static isRoom : boolean;

    constructor(){}
//new change here

    static isLogicComparison(filter : any){
        if(filter === "AND" || filter === "OR"){
            return true;
        } else {return false;}
    }

    static isMComparison(filter : any){
        if(filter === "LT" || filter === "GT" || filter ==="EQ"){
            return true;
        } else {return false;}
    }

    static isSComparison(filter : any){
        if(filter === "IS"){
            return true;
        } else {return false;}
    }

    static isNegation(filter : any){
        if(filter === "NOT"){
            return true;
        } else {return false;}
    }



    evaluate(courseObject : any) : boolean {
        return false;
    }


}
