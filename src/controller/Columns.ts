


import Key from "./Key";
import Filter from "./Filter";

export interface keySet {
    queryKeyArray : any[];
    dataKeyArray : any[];
}
//new change here
export default class Columns {

    keys : any[];

    constructor(columns : any){
        this.keys = [];

        try{
            this.getKeys(columns);

            if (typeof Filter.isRoom === 'undefined'|| Filter.isRoom === null) {
               this.getIsRooms(columns);
            }
        }catch(err){
            throw err;
        }

    }




    getKeys(columns : any){

        var oArr : any[] = Object.keys(columns);
        let size = oArr.length;

        for(let i = 0; i < size; i++) {

            var keysKey = oArr[i];
            var key = columns[keysKey];

            if (this.isValidColumn(key)) {
                this.keys.push(key);
            } else {
                throw "getKeys error";
            }
        }
    }

    isValidColumn(key : any){

            if(Key.isKey(key) || (typeof key === "string" && !key.includes("_"))){
                return true;
            } else {return false;}

    }

    getIsRooms(columns :any) {

        var oArr : any[] = columns;

        let key = columns[0];

        Filter.isRoom = Key.isRoomKey(key);


    }

/*
    areKeys(keys : any) : boolean {

        for(let key of keys) {
            if (key === "courses_dept" || key === "courses_id" || "courses_avg" || "courses_instructor" || "courses_title" || "courses_pass" || "courses_fail" || "courses_audit" || "courses_uuid" || "courses_year" || "rooms_fullname" || "rooms_shortname" || "rooms_number" || "rooms_name"  || "rooms_address" || "rooms_lat" || "rooms_lon" || "rooms_seats" || "rooms_type" || "rooms_furniture" || "rooms_href") {

            } else{return false;}
        } return true;
    } */
/*
    getAltKeyArray() : any[] {
        var altKeyArray : any[] = [];

        for(var key of this.keys){
            if(key === "courses_dept"){
                altKeyArray.push("Subject");
            }
            if(key === "courses_id"){
                altKeyArray.push("Course");
            }
            if(key === "courses_avg"){
                altKeyArray.push("Avg");
            }
            if(key === "courses_instructor"){
                altKeyArray.push("Professor");
            }
            if(key === "courses_title"){
                altKeyArray.push("Title");
            }
            if(key === "courses_pass"){
                altKeyArray.push("Pass");
            }
            if(key === "courses_fail"){
                altKeyArray.push("Fail");
            }
            if(key === "courses_audit"){
                altKeyArray.push("Audit");
            }
            if(key === "courses_uuid"){
                altKeyArray.push("id");
            }
            if(key === "courses_year"){
                altKeyArray.push("Year")
            }
            if(key == "rooms_fullname"){
                altKeyArray.push("rooms_fullname")
            }
            if(key == "rooms_shortname"){
                altKeyArray.push("rooms_shortname")
            }
            if(key == "rooms_number"){
                altKeyArray.push("rooms_number")
            }
            if(key == "rooms_name"){
                altKeyArray.push("rooms_name")
            }
            if(key == "rooms_address"){
                altKeyArray.push("rooms_address")
            }
            if(key == "rooms_lat"){
                altKeyArray.push("rooms_lat")
            }
            if(key == "rooms_lon"){
                altKeyArray.push("rooms_lon")
            }
            if(key == "rooms_seats"){
                altKeyArray.push("rooms_seats")
            }
            if(key == "rooms_type"){
                altKeyArray.push("rooms_type")
            }
            if(key == "rooms_furniture"){
                altKeyArray.push("rooms_furniture")
            }
            if(key == "rooms_href"){
                altKeyArray.push("rooms_href")
            }
        }
        return altKeyArray;

    } */

    evaluate() : keySet {

       // var keyArrays : keySet = {queryKeyArray : this.keys, dataKeyArray : this.getAltKeyArray()};
        var keyArrays : keySet = {queryKeyArray : this.keys, dataKeyArray : this.keys};

        return keyArrays;

    }


}
