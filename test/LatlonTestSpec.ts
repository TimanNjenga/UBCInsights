///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("LatLonSpec", function () {


    let insightfacade : InsightFacade  = new InsightFacade();


//new change here

    let fs = require('fs');

    let astring = "courses";
    let data = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');

    let astring2 = "rooms";
    let data2 = fs.readFileSync('rooms.zip');
    let contentstring2 = data2.toString('base64');


    let data3 = fs.readFileSync('testRooms.zip');
    let contentstring3 = data3.toString('base64');

    let data4 = fs.readFileSync('testRooms (2).zip');
    let contentstring4 = data4.toString('base64');

    let query1 = {

        "WHERE": {
            "IS": {
                "rooms_name": "DMP_*"
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_name"
            ],
            "ORDER": "rooms_name"
        }
    };

    let query2 = {

        "WHERE":{
            "IS":
                {
                    "rooms_address": "6303 North West Marine Drive"
                }
        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_lon",
                "rooms_lat",
                "rooms_shortname",
                "rooms_address",
                "rooms_name",
                "rooms_seats"
            ],
            "ORDER":"rooms_lon"
        }
    };

   //this.timeout(50000);



    beforeEach(function () {
       // insightfacade = new InsightFacade();


    });

    afterEach(function () {
       // insightfacade = null;
    });

 //this.timeout(5000);

    it("given blank file should return blank file ",function(){
        return insightfacade.addDataset(astring2, contentstring2)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);

            }).catch(function (err: any) {
                Log.test('Error: ' + err);
                expect.fail();
                })
    });

    it("should return blank file ",function(){
        return insightfacade.performQuery(query2)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(200);
                //console.log(response.body);
                expect(response.body).to.deep.equal(response.body);


            }).catch(function (err: any) {

                Log.test('Error: ' + err);
                expect.fail();

            })
    });










});

