
import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import chai = require('chai');
import chaiHttp = require('chai-http');
import Response = ChaiHttp.Response;
import restify = require('restify');
import * as fs from "fs";

describe("putDatasetSpec", function () {

    let server:Server;
    let URL:string;

    beforeEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        // Init
        chai.use(chaiHttp);
        server = new Server(4321);
        URL = "http://127.0.0.1:4321";

        // Test
        expect(server).to.not.equal(undefined);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    this.timeout(60000);


    it("put should pass", function() {
        return server.start().then(function(success: boolean) {
            return chai.request(URL)
                .put('/dataset/courses')
                .attach("body", fs.readFileSync('courses.zip'), 'courses.zip')
                .then(function (res: Response) {
                    Log.trace('then:');
                    Log.test('Response number: ' + res.status);
                    expect(res.status).to.deep.equal(204);
                    server.stop();
                })
                .catch(function (err) {
                    Log.trace('catch:');
                    Log.test('Error: ' + err);
                    expect.fail();
                });

        }).catch(function(err:any) {
            expect.fail()
        })


    });


});
