///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("ArgonTestSpec", function () {


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
    };

    //this.timeout(50000);



    beforeEach(function () {
        //insightfacade = new InsightFacade();


    });

    afterEach(function () {
        //insightfacade = null;
    });

    it("given blank file should return blank file ",function(){
        return insightfacade.removeDataset(astring)
            .then(function (response: InsightResponse) {
                Log.test('Error: ' + response);
                expect.fail();
            }).catch(function (err: any) {
                Log.test('Response number: ' + err.code);
                Log.test('Response body: ' + err.body);
                expect(err.code).to.deep.equal(404);
                expect(err.body).to.deep.equal("the operation was unsuccessful because the delete was for a resource that was not previously added ");
            })
    });



    it("should add a file ",function(){
        return insightfacade.addDataset(astring2, contentstring3)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful and the id was new (not added in this session or was previously cached) ");

            }).catch(function (err: any) {
                console.log(err) ;
                Log.test('Error: ' + err);
                expect.fail();
            })
    });

    it("should add a file ",function(){
        return insightfacade.addDataset(astring2, contentstring4)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(201);
                expect(response.body).to.deep.equal("the operation was successful and the id already existed (was added in this session or was previously cached)");

            }).catch(function (err: any) {
                console.log(err) ;
                Log.test('Error: ' + err);
                expect.fail();
            })
    });

    it("should add a file ",function(){
        return insightfacade.addDataset(astring, contentstring)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful and the id was new (not added in this session or was previously cached) ");

            }).catch(function (err: any) {
                console.log(err) ;
                Log.test('Error: ' + err);
                expect.fail();
            })
    });

    it("given blank file should return blank file ",function(){
        return insightfacade.removeDataset(astring)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful");

            }).catch(function (err: any) {
                //console.log(err) ;
                Log.test('Error: ' + err);
                expect.fail();
            })
    });





});

