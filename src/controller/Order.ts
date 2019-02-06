

export interface orderRetObject {
    dir : any
    keys: any[]
}

export default class Order  {
//new change here
    dir : any;
    keys : any[];
    //key: any ;

    constructor(order : any) {
        this.keys = [] ;

        try{
            if(this.isThereisDirOrKeys(order)){
                this.dir = this.getDirection(order);
                this.getKeys(order);
            } else{
                this.dir = null;
                this.keys.push(this.getSingleKey(order));
            }
            //this.key = this.getKey(order);

        }catch(err){
            throw err;
        }

    }

    isThereisDirOrKeys(order : any) : boolean {
        let oArr : any[] = Object.keys(order);
        return ((oArr[0] === "dir")  && (oArr[1] === "keys" ));
    }

    getDirection(order : any){
        let oArr : any[] = Object.keys(order);

        if(oArr[0] === "dir") {
            let dirKey = oArr[0];
            let dir = order[dirKey];
            if(dir === 'UP' || dir === 'DOWN'){
                return dir;
            }else {

                throw "getDirections err"}
        } else {
            throw "getDirections err"}



    }

    getKeys(order : any){

        let oArr : any[] = Object.keys(order);

        if(oArr[1] === "keys") {
            let keysKey = oArr[1];
            let keys = order[keysKey];

            for(let i = 0; i < keys.length; i++) {

                var singleKey = keys[i];
                if(this.isKey(singleKey)){
                    this.keys.push(singleKey);
                } else {
                    throw "getKey error";
                }
            }

        } else {
            throw "getKey err"}


    }

    getSingleKey(order : any){

        if(this.isKey(order)){
            return order;
        } else {
            throw "getKey error";
        }

    }

    ///needs to check whether the string(s) in apply are in the columns, they are valid columns

    isKey(key : any) : boolean {
        if (this.isRoomKey(key) || this.isCourseKey(key)) {
            return true;

        } else{return false;}
    }

    isRoomKey(key : any) : boolean { if (key === "rooms_fullname" || "rooms_shortname" || "rooms_number" || "rooms_name" || "rooms_address" || "rooms_lat" || "rooms_lon" || "rooms_seats" || "rooms_type" || "rooms_furniture" || "rooms_href") {
        return true;
    } else{return false;}

    }

    isCourseKey(key : any) : boolean {
        if (key === "courses_dept" || key === "courses_id" || "courses_avg" || "courses_instructor" || "courses_title" || "courses_pass" || "courses_fail" || "courses_audit" || "courses_uuid" || "courses_year") {
            return true;
        } else{return false;}
    }


    evaluate() : any {
        let orderRetObject : orderRetObject = {
            dir : this.dir,
            keys: this.keys
        };

        return orderRetObject ;
    }
}
