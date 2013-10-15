var CodeLoader = require('./../../../src/infrastructure/codeLoader');

describe("CodeLoader", function(){
   var loader = new CodeLoader({"controllerFolderPath":"./../../tests/app/controllers/"});
   var name = "testController";

   it("should load controller correctly", function(){
      var ctrl = loader.loadController(name);
      expect(ctrl).not.toBeNull();
      expect(ctrl).toBeDefined();
      expect(typeof ctrl).toBe("function");
   });
});