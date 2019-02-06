///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";
import setTimeout = core.setTimeout;


describe("removedatasetspec", function () {

    let insightfacade : InsightFacade  = null;
//new change here
    let fs = require('fs');
    let astring = "courses";
    let data = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');

    beforeEach(function () {
        insightfacade = new InsightFacade();
    });

    afterEach(function () {
        insightfacade = null;
    });

    //this.timeout(5000);


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

    it("should remove a file ",function(){
        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.removeDataset(astring)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(204);
                        expect(response.body).to.deep.equal("the operation was successful");

                    }).catch(function (err: any) {
                        //console.log(valueonce) ;
                        //console.log(err) ;
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });

});


