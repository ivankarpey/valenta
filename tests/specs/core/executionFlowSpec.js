var ExecutionFlow = require("../../../src/core/executionFlow");

describe("Execution Flow", function(){
    it("should init with new command", function(){
        var flow = new ExecutionFlow();
        expect(flow).toBeTruthy();
    })


});
