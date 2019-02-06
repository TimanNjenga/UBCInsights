





import Filter from "./Filter";
import Key from "./Key";

export default class Group {
    keyArray : any[] = [];

    constructor(group : any) {
        try{
            this.setIsRooms(group);
            this.setKeyArray(group);
        }catch(err){
            throw err;
        }
    }


    setIsRooms(group : any[]) {

        for(let k of group){

            if(typeof Filter.isRoom === 'undefined'|| Filter.isRoom === null) {
                Filter.isRoom = Key.isRoomKey(k);
            }
            if(Filter.isRoom && !Key.isRoomKey(k)){
                throw "course room mismatch"
            }
            if(!Filter.isRoom && !Key.isCourseKey(k)){
                throw "course room mismatch"
            }
        }

    }


    setKeyArray(group : any){

        let length = group.length;

        for(let i = 0; i < length; i++){

            if(Filter.isRoom){
                if(Key.isRoomKey(group[i])){
                   //newArray[i] = groupArray[i];
                } else {throw "Group setKeyArray error";}

            } else{
                if(Key.isCourseKey(group[i])){
                    //newArray[i] = groupArray[i];
                } else {throw "Group setKeyArray error";}
            }
        }
        this.keyArray = group;
    }

    evaluate(){
        return this.keyArray;

    }




}