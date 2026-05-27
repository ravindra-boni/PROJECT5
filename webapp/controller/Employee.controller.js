sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project5.controller.Employee", {

        onInit: function () {

            // OData model already defined in manifest
            this.oModel = this.getOwnerComponent().getModel();

            this.getView().setModel(this.oModel);

            MessageToast.show("Employee App Loaded");
        },

        onSelectEmployee: function (oEvent) {

            var oItem = oEvent.getParameter("listItem");
            var oContext = oItem.getBindingContext();

            this.byId("detailPage").setBindingContext(oContext);
        },

        onSearchEmployee: function (oEvent) {

            var sValue = oEvent.getParameter("VALUE");
            var oList = this.byId("empList");
            var oBinding = oList.getBinding("items");

            if (sValue) {
                var oFilter = new Filter("EmpName", FilterOperator.Contains, sValue);
                oBinding.filter([oFilter]);
            }       
        }

    });

});
