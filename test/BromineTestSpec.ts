///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("BromineTestSpec", function () {


    let insightfacade : InsightFacade  = new InsightFacade();


//new change here

    let fs = require('fs');
    let astring = "rooms";
    let astring2 = "courses";
    let data = fs.readFileSync('rooms.zip');
    let contentstring = data.toString('base64');

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
        "WHERE": {
            "IS": {
                "rooms_address": "*Agrono*"
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_address", "rooms_name"
            ]
        }
    } ;



    beforeEach(function () {
           });

    afterEach(function () {
    });
    //this.timeout(50000)



    it(" add invalid id first query for Bromine",function(){
        return insightfacade.addDataset("THEGREATESTIDEVER", contentstring)
            .then ( function (valueonce) {
                Log.test('Error: ' + valueonce);
                expect.fail();
            })
            .catch(function (err: any) {
                Log.test('Response number: ' + err.code);
                Log.test('Response body: ' + err.body);
                expect(err.code).to.deep.equal(400);
                expect(err.body).to.deep.equal({"error": "Invalid  ID"});
            });
    });

    it(" blank dataset - second query for bromine ",function(){
        return insightfacade.performQuery(query1)
            .then(function ( response: InsightResponse ) {
                // console.log(response.body);
                Log.test('Error: ' + response);
                expect.fail();

            }).catch(function ( err: any ) {
                Log.test('Response number: ' + err.code);
                Log.test('Response body: ' + err.body);
                expect(err.code).to.deep.equal(424);
                expect(err.body).to.deep.equal({"error ": "there are no data sets in the file"});
                //console.log(err);

            })
    });





});

