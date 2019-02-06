


import Columns, {keySet} from "./Columns";
import Order from "./Order";

export interface returnObject {
    key : any;
    keySet : keySet
}
//new change here
export default class Options {

    columns : Columns;
    order : Order;

    constructor(options : any) {
        try{
            this.columns = new Columns(this.getColumns(options));

            if(this.isThereOrder(options)){
                this.order = new Order(this.getOrder(options));
                this.symanticCheck();
            } else{this.order = null;}
        }catch(err){
            throw err;
        }
    }

    symanticCheck(){

        for(var key of this.columns.keys){
            if(this.order.keys.includes(key)){
                return;
            }
        }
        throw "Order key not in columns"
    }



    getColumns(options : any){
        var oArr : any[] = Object.keys(options);

        if(oArr[0] === "COLUMNS") {
            var columnsKey = oArr[0];
            var columns = options[columnsKey];
            return columns;
        } else {
            throw "getColumns err"}
    }

    isThereOrder(options : any) : boolean {
        var oArr : any[] = Object.keys(options);
        if(oArr[1] === "ORDER") {
            return true;
        } else {return false;}
    }

    getOrder(options : any){

        var oArr : any[] = Object.keys(options);
        if(oArr[1] === "ORDER") {
            var orderKey = oArr[1];
            var order = options[orderKey];
            return order;
        } else {
            throw "getOrder err"}
    }


    isKey(keys : any) : boolean {

        for(var key of keys) {
            if (this.isCourseKey(key) || this.isRoomKey(key)) {

            } else{return false;}
        } return true;
    }


    isRoomKey(key : any) : boolean {
        if (key === "rooms_fullname" || "rooms_shortname" || "rooms_number" || "rooms_name" || "rooms_address" || "rooms_lat" || "rooms_lon" || "rooms_seats" || "rooms_type" || "rooms_furniture" || "rooms_href") {
        return true;
    } else{return false;}

    }

    isCourseKey(key : any) : boolean {
        if (key === "courses_dept" || key === "courses_id" || "courses_avg" || "courses_instructor" || "courses_title" || "courses_pass" || "courses_fail" || "courses_audit" || "courses_uuid" || "courses_year") {
            return true;
        } else{return false;}
    }



    evaluate() : any{

        if(this.order != null){
            var returnObject : returnObject = {
                key : this.order.evaluate(),
                keySet : this.columns.evaluate()
            };
        } else {

            var returnObject: returnObject = {
                key: null,
                keySet: this.columns.evaluate()
            };
        }
        return returnObject;
    }


}
