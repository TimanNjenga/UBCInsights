import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {Dataset} from "./InsightFacade";
import {isNullOrUndefined} from "util";

export default class Rooms {
    tempArray : any []  ;
    tableTitleArray : any []  ;
    buildingInfoArray : any[];
    counter: number ;
    roomObject :any;
    booForNotIndexhtm :boolean ;
    //HrefBoo:boolean ;
    isValid:boolean ;



    constructor() {
        this.tempArray = [];
        this.tableTitleArray = [];
        this.buildingInfoArray = [];
        this.counter = 0;
        this.roomObject = {} ;
        this.booForNotIndexhtm = false;
        //this.HrefBoo = false;
        this.isValid = false;
    }

    unZip(id : string, content : string) : Promise<Array<any>>{
        let that = this ;

        let parse5 = require('parse5');
        let JSZip = require('jszip');
        let zip = new JSZip();
        let rArr: any[] = [];
        let indexArray : any []  = [];
        let parsedRArr: any [] = [];



        return new Promise(function (fulfill , reject){

            zip.loadAsync(content, {base64:true})
                .then(function (result:any ) {
                    Object.keys(result.files).forEach(function ( filepath ) {
                        if (filepath.includes("index.htm")){
                            result.file(filepath).async("string")
                                .then(function ( indexresult: any ) {
                                    indexArray.push(parse5.parse(indexresult));
                                })
                                .catch(function ( err: any ) {
                                    reject(err);
                                });
                        }else {
                            if (result.file(filepath)){
                                rArr.push(result.file(filepath).async("string")
                                    .catch(function ( err: Array<any> ) {
                                        reject(err);
                                    })
                                )}
                        }
                    });
                    Promise.all(rArr)
                        .then(function ( finalResult: any ) {
                            for (let i in finalResult) {
                                if (finalResult.hasOwnProperty(i)){
                                    parsedRArr.push(parse5.parse(finalResult[i]));
                                }
                            }
                            for ( let z of indexArray) {
                                that.getObject(z) ;
                            }
                            let indexHTMArray = that.tempArray;
                            let finalArray : any [] = [] ;

                            for ( let r of parsedRArr) {

                                that.tempArray = [] ;
                                that.tableTitleArray = [] ;
                                that.buildingInfoArray = [];
                                that.roomObject = {} ;
                                that.counter = 0 ;
                                that.isValid = false;
                                that.booForNotIndexhtm = true;

                                that.getObject(r) ;
                                that.isValidBuilding(indexHTMArray);


                                if(that.isValid ) {
                                    let buildingObject = {
                                        finalBuildingArr: that.buildingInfoArray,
                                        finalRoomsArr: that.tempArray,
                                    };
                                    finalArray.push(buildingObject);
                                }

                                that.booForNotIndexhtm = false;
                            }
                            fulfill(finalArray);


                        })
                        .catch(function ( err: any ) {
                            reject(err);
                        })

                })
                .catch(function (err: any) {
                    reject(err);
                });
        }) ;

    }
    isValidBuilding (indexHTMArray : any) :boolean{
        let that = this;
        for (let f in indexHTMArray){
            if (indexHTMArray.hasOwnProperty(f)){
                let values = Object.keys(indexHTMArray[f])
                    .map(function(e) {
                        return indexHTMArray[f][e]
                    });

                for (let d of that.buildingInfoArray){
                    if (values.includes(d)){
                        that.buildingInfoArray = indexHTMArray[f];
                        that.isValid = true;
                        return
                    }
                }
            }
        }

        return that.isValid
    }

    getObject(resultObject: any){
        let that = this ;

        if  (resultObject instanceof Array) {

            for (let z of resultObject) {
                that.getObject(z) ;
            }
        }
        if (resultObject instanceof Object){
            that.checkObject(resultObject);

        }
    }

    checkObject( resultObject : any) : any {
        let that = this;
        for (let y in resultObject ) {
            if (resultObject.hasOwnProperty(y)) {
                if (( y === "nodeName") && (resultObject[y] === 'div')) {
                    for (let i = 0 ; i < resultObject.attrs.length ; i++ ){
                        if ((resultObject.attrs[i].name === "id")
                            && (resultObject.attrs[i].value === "building-info")){
                            that.getBuildingInfo(resultObject) ;
                        }
                    }
                }
                if (( y === "nodeName") && (resultObject[y] === 'th')) {
                    that.getTh(resultObject) ;
                }
                if (( y === "nodeName") && (resultObject[y] === 'td')) {
                    that.getTd(resultObject);
                }
                if (y === "childNodes") {
                    that.getObject(resultObject[y]);
                }
            }
        }
        return ;
    };

    getTd( resultObject : any) {
        let that = this ;

        for (let y = 0 ; y < resultObject.childNodes.length ; y ++){

            let newObject = resultObject.childNodes[y];

            if (!(newObject.childNodes) ) {
                if (newObject.value.length > 22 ){
                    let value = that.getAttr(newObject) ;
                    that.printvalue(value) ;
                }

            }else {
                for (let z = 0 ; z < newObject.childNodes.length ; z ++){
                    if (newObject.childNodes[z].value){
                        let value = that.getAttr(newObject.childNodes[z]) ;
                        if ((value) && (value !== "More info")){
                            if (that.booForNotIndexhtm){
                                that.sethref(newObject) ;
                            }
                            that.printvalue(value) ;
                        }/* else {
                            console.log(value);
                            that.HrefBoo = false ;
                        }*/
                    }
                }
            }
        }
        return
    };
    sethref ( newObject :any ) :any{

        let that = this;
        for (let z = 0 ; z < newObject.attrs.length ; z ++){
            if ((newObject.attrs[z].name === "href")) {
                let value = that.getAttr(newObject.attrs[z]);
                if (!(that.tableTitleArray.includes("href"))) {
                    that.tableTitleArray.unshift(newObject.attrs[z].name);
                }
                if (value) {
                    that.printvalue(value);
                }
            } /*
        && (!that.HrefBoo)
        && ( value !== "More info" )
            if (value === "Room Details") {
                console.log(value);
                that.HrefBoo = true;
            }*/

        }
    }
    getTh( resultObject : any) {
        let that = this ;

        for (let i = 0 ; i < resultObject.childNodes.length ; i ++){
            let value = that.getAttr(resultObject.childNodes[i]) ;
            if (value){
                that.tableTitleArray.push(value);
            }
        }
        return;
    };

    getBuildingInfo( resultObject : any ){

        let that = this;
        let otherObject = resultObject.childNodes;

        for (let z = 0 ; z < otherObject.length ; z ++){

            if (otherObject[z].value){
                let value = otherObject[z].value.trim();
                if (value){
                    that.buildingInfoArray.push (value);
                }
            }
            if (otherObject[z].attrs) {
                let newVal = otherObject[z].attrs ;
            }

            if (otherObject[z].childNodes){
                that.getBuildingInfo(otherObject[z]) ;
            }

        }

    }

    getAttr( resultObject : any) : any {
        return resultObject.value.trim();
    };

    printvalue(value : any ) {
        let that = this;
        if (value === "More info") {
            that.counter++
        } else {
            let secondRoomsObject = {[that.tableTitleArray[that.counter].replace(/ /g, '_')]: value};
            that.roomObject = Object.assign({}, that.roomObject, secondRoomsObject);
            that.counter++;
            if ((that.counter >= that.tableTitleArray.length)
                && (that.tableTitleArray.length !== 0)) {
                that.counter = 0;
                this.tempArray.push(that.roomObject);
            }
        }

    }



}
