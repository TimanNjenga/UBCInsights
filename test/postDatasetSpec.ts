
import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import chai = require('chai');
import chaiHttp = require('chai-http');
import Response = ChaiHttp.Response;
import restify = require('restify');
import * as fs from "fs";

describe("postDatasetSpec", function () {
    let server:Server;
    let URL:string;
    let queryJSONObject:any;

    beforeEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        server = new Server(4321);
        URL = "http://127.0.0.1:4321";
        queryJSONObject = {

            "WHERE": {
                "IS": {
                    "courses_instructor": 'campbell, deborah'
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "courses_instructor"
                ],
                "ORDER": "courses_avg"
            }
        };
        chai.use(chaiHttp);
        expect(server).to.not.equal(undefined);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        server = null;
        URL = null;
        queryJSONObject = null;
    });

    //this.timeout(5000);


    it("post without put should fail", function () {
        return server.start().then(function(success: boolean) {
            return chai.request(URL)
                .post('/query')
                .send(queryJSONObject)
                .then(function (err: Response) {
                    Log.trace('catch:');
                    Log.test('Error: ' + err);
                    expect.fail();
                })
                .catch(function (res) {
                    Log.trace('then:');
                    Log.test('Response number: ' + res.status);
                    expect(res.status).to.deep.equal(424);
                    server.stop();
                });

        }).catch(function(err:any) {
            expect.fail()
        })
    });

    it("post with put should pass", function () {
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
                    .post('/query')
                    .send(queryJSONObject)
                    .then(function (res: Response) {
                        Log.trace('then:');
                        Log.test('Response number: ' + res.status);
                        expect(res.status).to.deep.equal(200);
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

    it("put then server shutdown then post should pass", function () {
        return server.start()
            .then(function(success: boolean) {
                return chai.request(URL)
                    .put('/dataset/courses')
                    .attach("body", fs.readFileSync('courses.zip'), 'courses.zip')
            }).catch(function(err:any) {
                expect.fail()
            }).then(function(res: Response) {
                expect(res.status).to.be.equal(204);
                return chai.request(URL)
                    .post('/query')
                    .send(queryJSONObject)
                    .then(function (res: Response) {
                        Log.trace('then:');
                        Log.test('Response number: ' + res.status);
                        expect(res.status).to.deep.equal(200);
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

    it("post with put then del should fail", function () {
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
            }).catch(function(err:any) {
                expect.fail()
            })
            .then(function(res: Response) {
                expect(res.status).to.be.equal(204);
                return chai.request(URL)
                    .post('/query')
                    .send(queryJSONObject)
                    .then(function (err: Response) {
                        Log.trace('catch:');
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
                    .catch(function (res) {
                        Log.trace('then:');
                        Log.test('Response number: ' + res.status);
                        expect(res.status).to.deep.equal(424);
                        server.stop();
                    });
            }).catch(function(err) {
                expect.fail()
            })
    });


});
