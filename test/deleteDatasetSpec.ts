
import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import chai = require('chai');
import chaiHttp = require('chai-http');
import Response = ChaiHttp.Response;
import restify = require('restify');
import * as fs from "fs";

describe("deleteDatasetSpec", function () {

    beforeEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    //this.timeout(50000);


    it("delete without put should fail", function () {
        // Init
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";

        // Test
        expect(server).to.not.equal(undefined);
        return server.start().then(function(success: boolean) {
            return chai.request(URL)
                .del('/dataset/courses')
                .then(function (err: Response) {
                    Log.trace('catch:');
                    Log.test('Error: ' + err);
                    expect.fail();
                })
                .catch(function (res) {
                    Log.trace('then:');
                    Log.test('Response number: ' + res.status);
                    expect(res.status).to.deep.equal(404);
                    server.stop();
                });

        }).catch(function(err:any) {
            expect.fail()
        })
    });

    it("delete with put should pass", function () {
        // Init
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://127.0.0.1:4321";

        // Test
        expect(server).to.not.equal(undefined);

        return server.start()
            .then(function(success: boolean) {
                return chai.request(URL)
                    .put('/dataset/courses')
                    .attach("body", fs.readFileSync('courses.zip'), 'courses.zip')
            }).catch(function(err:any) {
                expect.fail()
            })
            .then(function(res: Response) {
                expect(res.status).to.be.equal(204);
                return chai.request(URL)
                    .del('/dataset/courses')
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
            }).catch(function(err) {
                expect.fail()
            })
    });


});
