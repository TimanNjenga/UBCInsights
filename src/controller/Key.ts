



export default class Key {
    static coursesSKeys : any[] = ["courses_dept", "courses_instructor", "courses_title", "courses_uuid", "courses_id"];
    static coursesMKeys : any[] = ["courses_pass", "courses_audit", "courses_avg", "courses_fail", "courses_year"];
    static roomsMKeys : any[] = ["rooms_lat", "rooms_lon", "rooms_seats"];
    static roomsSKeys : any[] = ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_name", "rooms_address", "rooms_type", "rooms_furniture", "rooms_href"];


    static isKey(key : any){
        if(Key.isCourseKey(key) || Key.isRoomKey(key)){
            return true;
        }
        return false;
    }

    static isSKey(key : any){
        if(Key.isCourseSKey(key) || Key.isRoomSKey(key)){
            return true;
        }
        return false;
    }

    static isMKey(key : any){
        if(Key.isCourseMKey(key) || Key.isRoomMKey(key)){
            return true;
        }
        return false;
    }

    static isCourseKey(key : any){
        if(Key.isCourseMKey(key) || Key.isCourseSKey(key)){
            return true;
        }
        return false;
    }

    static isRoomKey(key : any){
        if(Key.isRoomMKey(key) || Key.isRoomSKey(key)){
            return true;
        }
        return false;

    }



    static isRoomMKey(key : any){
        if(Key.roomsMKeys.includes(key)){
            return true;
        }
        return false;

    }

    static isCourseMKey(key : any){
        if(Key.coursesMKeys.includes(key)){
            return true;
        } return false;

    }

    static isCourseSKey(key : any){
       if(Key.coursesSKeys.includes(key)){
           return true;
       }
       return false;
    }

    static isRoomSKey(key : any){
        if(Key.roomsSKeys.includes(key)){
            return true;
        }
        return false;

    }



}