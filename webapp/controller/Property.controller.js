sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel",
     "project5/model/formatter1" 
], function (Controller, JSONModel, formatter1) {

    "use strict";

    return Controller.extend("project5.controller.Property", {

       formatter: formatter1, 

        onInit: function () {

            var oData = {

                employee: {
                    name: "Ravi",
                    role: "Developer",
                    salary: 60000
                },

                employees: [
                    { name: "Ravi", role: "Developer", salary: 60000 },
                    { name: "Kiran", role: "Tester", salary: 55000 }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

      
            this.getView().bindElement("/employee");
        }
    });

});