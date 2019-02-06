
import Query from "./Query";
import {Dataset} from "./InsightFacade";

export default class Program {
    query: Query;

//new change here
    parseQuery(jsonObject: any) {
        try {
            this.query = new Query(jsonObject);

        } catch (err) {
            throw err;
        }

    }
    evaluateAll( resultobject: any) : any[] {
     //   console.log(resultobject);
        try {
            return this.query.evaluate(resultobject);
        } catch (err) {
            throw err;
        }
    }
}

// place to store data D
// autobot call your addDS: data -> D
// autobot call performQ: D-> response