import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {Dataset} from "./InsightFacade";

export  interface Room {
    rooms_fullname: string, //Full building name (e.g., "Hugh Dempster Pavilion").
    rooms_shortname: string, //Short building name (e.g., "DMP").
    rooms_number: string, //The room number. Not always a number, so represented as a string.
    rooms_name: string, //The room id; should be rooms_shortname+"_"+rooms_number.
    rooms_address: string, //The building address. (e.g., "6245 Agronomy Road V6T 1Z4").
    rooms_lat: number, //The latitude of the building. Instructions for getting this field are below.
    rooms_lon: number, //The longitude of the building. Instructions for getting this field are below.
    rooms_seats: number, // The number of seats in the room.
    rooms_type: string, // The room type (e.g., "Small Group").
    rooms_furniture: string, // The room type (e.g., "Classroom-Movable Tables & Chairs").
    rooms_href: string, // The link to full details online (e.g., "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201").
}

export default class Address {
    finalArray : any []  ;
    //newcounter : number ;



    constructor() {
        this.finalArray = [];
       // this.newcounter = 0;
    } ;


    getaddress(newArr :any) : Promise<Array<any>>{

        let that = this;
        let tempArr : any [] = [];

        return new Promise(function (fulfill , reject){


            for (let item of newArr){
                let bldngInfoArr = item.finalBuildingArr;
                tempArr.push (that.replaceAddresswithLatLon(bldngInfoArr));

            }
            Promise.all(tempArr)
                .then(function ( finalResult: any ){
                    for (let item = 0 ; item < newArr.length ; item++){
                        let rArr = newArr[item].finalRoomsArr;
                        for (let z in rArr) {
                            if (rArr.hasOwnProperty(z)) {
                                let v = Object.assign({}, finalResult[item], rArr[z]) ;
                                let  rooms_rs = v.Code+"_"+v.Room;
                                let roomsObject : Room = {
                                    rooms_fullname: v.Building,
                                    rooms_shortname: v.Code,
                                    rooms_number: v.Room,
                                    rooms_name: rooms_rs,
                                    rooms_address: v.Address,
                                    rooms_lat: v.lat,
                                    rooms_lon: v.lon,
                                    rooms_seats: Number.parseInt(v.Capacity),
                                    rooms_type: v.Room_type,
                                    rooms_furniture: v.Furniture_type,
                                    rooms_href: v.href,
                                };
                               // console.log(roomsObject);
                                //that.newcounter++;
                                that.finalArray.push(roomsObject);
                            }
                        }
                    }
                    //console.log(that.newcounter);
                    //console.log(that.finalArray);
                    fulfill(that.finalArray);

                })
                .catch(function (err: any) {
                    reject(err);
                });
        }) ;

    }
    replaceAddresswithLatLon ( roomObject :any): Promise<any>{
        let that = this;

        return new Promise((fulfill, reject)=> {

            for (let i in roomObject) {
                if (roomObject.hasOwnProperty(i)) {
                    if (i === "Address") {
                        Address.getGeoLocation(roomObject[i]).then(function ( latlon: any ) {
                           // console.log(latlon)
                            if (latlon.includes("lat")){
                                let thisobject = Object.assign({}, roomObject, JSON.parse(latlon));
                                fulfill(thisobject);
                            }
                            if (latlon.includes("err")){
                             //   console.log("lat lon error")
                              // reject(Error("Get Latlon Err"))
                                fulfill(roomObject);
                            }

                        }).catch(function ( err: any ) {
                          //  console.log("getGeoLocation Error");
                            reject(err)
                        });
                    }
                }
            }
        })



    }

    static getGeoLocation(address : any): Promise<any>{
        let http = require("http");
        let AddressURL = "http://skaha.cs.ubc.ca:11316/api/v1/team65/" + address.replace(/ /g, '%20');

        return new Promise((fulfill, reject)=>{
            http.get(AddressURL, (res: any) => {
                let data = '';
                res.on('data', (chunk : any) => {
                    data += chunk;

                });

              /*  res.on('error', function(e : any) {
                    fulfill(null);
                }); */

                res.on('end', () => {
                    try {
                        fulfill(data);
                    } catch (err){
                       // fulfill(err);
                        reject (err);
                    }
                   // fulfill(data)

                    res.on('error', function(e : any) {
                        fulfill("error");
                    });



                });


            });
        })
    }





}
