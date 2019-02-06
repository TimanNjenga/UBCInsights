///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

//new change here

describe("adddatasetspec", function () {

    let insightfacade : InsightFacade  = null;

    let fs = require('fs');
    let astring = "courses";
    let data = fs.readFileSync('CPSC544.jpg');
    let contentstring = data.toString('base64');

    beforeEach(function () {
        insightfacade = new InsightFacade();
    });

    afterEach(function () {
        insightfacade = null;
    });
    //this.timeout(50000)


    it("should return blank file ",function(){
        return insightfacade.addDataset(astring , contentstring)
            .then(function (response: InsightResponse) {
                expect.fail();
                //expect(response.body).to.deep.equal(['{"result":[{"tier_eighty_five":1,"tier_ninety":8,"Title":"rsrch methdlgy","Section":"002","Detail":"","tier_seventy_two":0,"Other":1,"Low":89,"tier_sixty_four":0,"id":31379,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":9,"tier_g_fifty":0,"tier_forty":0,"Withdrew":1,"Year":"2015","tier_twenty":0,"Stddev":2.65,"Enrolled":20,"tier_fifty_five":0,"tier_eighty":0,"tier_sixty":0,"tier_ten":0,"High":98,"Course":"504","Session":"w","Pass":9,"Fail":0,"Avg":94.44,"Campus":"ubc","Subject":"aanb"},{"tier_eighty_five":1,"tier_ninety":8,"Title":"rsrch methdlgy","Section":"overall","Detail":"","tier_seventy_two":0,"Other":1,"Low":89,"tier_sixty_four":0,"id":31380,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":9,"tier_g_fifty":0,"tier_forty":0,"Withdrew":1,"Year":"2015","tier_twenty":0,"Stddev":2.65,"Enrolled":20,"tier_fifty_five":0,"tier_eighty":0,"tier_sixty":0,"tier_ten":0,"High":98,"Course":"504","Session":"w","Pass":9,"Fail":0,"Avg":94.44,"Campus":"ubc","Subject":"aanb"}],"rank":0}','{"result":[{"tier_eighty_five":3,"tier_ninety":2,"Title":"anml welf rsrch","Section":"003","Detail":"","tier_seventy_two":0,"Other":0,"Low":84,"tier_sixty_four":0,"id":31381,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":0,"tier_g_fifty":0,"tier_forty":0,"Withdrew":0,"Year":"2015","tier_twenty":0,"Stddev":2.56,"Enrolled":6,"tier_fifty_five":0,"tier_eighty":1,"tier_sixty":0,"tier_ten":0,"High":91,"Course":"551","Session":"w","Pass":6,"Fail":0,"Avg":87.83,"Campus":"ubc","Subject":"aanb"},{"tier_eighty_five":3,"tier_ninety":2,"Title":"anml welf rsrch","Section":"overall","Detail":"","tier_seventy_two":0,"Other":0,"Low":84,"tier_sixty_four":0,"id":31382,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":0,"tier_g_fifty":0,"tier_forty":0,"Withdrew":0,"Year":"2015","tier_twenty":0,"Stddev":2.56,"Enrolled":6,"tier_fifty_five":0,"tier_eighty":1,"tier_sixty":0,"tier_ten":0,"High":91,"Course":"551","Session":"w","Pass":6,"Fail":0,"Avg":87.83,"Campus":"ubc","Subject":"aanb"}],"rank":0}']);

            }).catch(function (err: any) {
                Log.test('Error: ' + err);
                expect(err.code).to.deep.equal(400);
                expect(err.body).to.deep.equal(err.body);
            })
    });


});





