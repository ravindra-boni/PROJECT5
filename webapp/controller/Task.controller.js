sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {

    "use strict";

    return Controller.extend("project5.controller.Task", {

        onInit: function () {

            var oData = {
                resources: [
        { key: "Training Room", text: "Training Room" },
                ],

                department: [
                    { department: "HR" },
                    { department: "OPERATIONS" },
                    { department: "ASSISTANTS" },
                    {department:"CONSULTANT"},
                    {department:"JAVA"},
                    {department:"TRAINEE"}

                ],

                bookings: [],
                    parkingBookings: []

            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },


              // BOOK SLOT
        onBook: function () {

            var oModel = this.getView().getModel();

            var oBooking = {
                resource: this.byId("resource").getSelectedKey(""),
            
                employee: this.byId("emp").getValue(),
                department: this.byId("dept").getValue(),
                date: this.byId("date").getValue(),
                time: this.byId("time").getValue(),
                capacity: this.byId("capacity_of_members").getValue()
             
            };

            var aBookings = oModel.getProperty("/bookings") || [];


             // Duplicate check//
    var bExists = aBookings.some(function (oItem) {

        return oItem.employee === oBooking.employee;

    });

    if (bExists) {

        MessageToast.show("Booking already exists for this employee");
        return;

    }


            aBookings.push(oBooking);

            oModel.setProperty("/bookings", aBookings);

            MessageToast.show("Slot Booked Successfully");
        },

     
        onFetchParking: function () {

    var oModel = this.getView().getModel();

    // All bookings
    var aBookings = oModel.getProperty("/bookings")  || [];

    // Filter only parking
    var aParking = aBookings.filter(function (oItem) {

        return oItem.resource === "Parking";

    });

    // Set filtered data
    oModel.setProperty("/parkingBookings", aParking);

    sap.m.MessageToast.show("Parking Slots Fetched");

        },


   onReset: function () {

    // reset inputs
    this.byId("resource").setSelectedKey("Parking");
    this.byId("emp").setSelectedKey("");
    this.byId("dept").setValue("");
    this.byId("date").setValue("");
    this.byId("time").setValue("");
    this.byId("vehicle").setValue("");
    this.byId("capacity_of_members").setValue("");

    sap.m.MessageToast.show("Reset Done");
},

    });

});