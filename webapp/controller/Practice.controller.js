sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, Sorter) {

    "use strict";

    return Controller.extend("project5.controller.Practice", {

        onInit: function () {

            // Data
            var oData = {

                employees: [
                    {
                        name: "Ravi",
                        role: "Developer",
                        salary: 60000
                    },
                    {
                        name: "Kiran",
                        role: "Tester",
                        salary: 40000
                    },
                    {
                        name: "Anil",
                        role: "Manager",
                        salary: 80000
                    }
                ]
            };

            // Model
            var oModel = new JSONModel(oData);

            this.getView().setModel(oModel);
        },

        // FILTER
        onFilter: function () {

 
            var oList = this.byId("empLists");

            var oBinding = oList.getBinding("items");

       
            var oFilter = new Filter(
                "role",
                FilterOperator.EQ,
                "Developer"
            );


            oBinding.filter([oFilter]);
        },

     
        onSort: function () {

           
            var oList = this.byId("empLists");

     
            var oBinding = oList.getBinding("items");

           var oSorter = new Sorter(
                "salary",
                true
            );

            // Apply Sorting
            oBinding.sort(oSorter);
        },

       onRefresh: function () {

    var oModel = this.getView().getModel();


     var oList = this.byId("empLists");
     var oBinding = oList.getBinding("items");
     oBinding.filter([]);

    oBinding.sort([]);

    oBinding.refresh();

 
}

    });
});