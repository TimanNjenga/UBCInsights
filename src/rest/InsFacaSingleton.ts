

import InsightFacade from "../controller/InsightFacade";

export default class InsFacaSingleton {

    private static instance:InsFacaSingleton = new InsFacaSingleton () ;
    private static facadeinstance:InsightFacade ;

    constructor() {
        if(InsFacaSingleton.instance){
            throw new Error();
        }
        InsFacaSingleton.instance = this;
        InsFacaSingleton.facadeinstance = new InsightFacade ();

    }

    public static getInstance():InsightFacade
    {
        return InsFacaSingleton.facadeinstance;
    }

}
