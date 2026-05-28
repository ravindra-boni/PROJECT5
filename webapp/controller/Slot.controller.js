sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {

    "use strict";

    return Controller.extend("project5.controller.Slot", {

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
                  

            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
onSelectSlot: function (oEvent) {

    var sTime = oEvent.getSource().getText();

    this.byId("time").setValue(sTime);

    MessageToast.show("Slot Selected: " + sTime);
},

              // BOOK SLOT
onBook: function () {

    var oModel = this.getView().getModel();

    var sTime = this.byId("time").getValue();
    var sDate = this.byId("date").getValue();

    //  CHECK EMPTY VALUES FIRST
    if (!sTime || !sDate) {
        MessageToast.show("Please select Date and Time Slot");
        return;
    }

    var oBooking = {
        resource: this.byId("resource").getSelectedKey(),
        employee: this.byId("emp").getValue(),
        department: this.byId("dept").getValue(),
      date: sDate,
  time: sTime,
        capacity: this.byId("capacity_of_members").getValue()
    };

    var aBookings = oModel.getProperty("/bookings") || [];

    //  PROPER DUPLICATE CHECK
    var bExists = aBookings.some(function (oItem) {
        return oItem.employee === oBooking.employee&&
               oItem.date === oBooking.date &&
               oItem.time === oBooking.time;
    });

    if (bExists) {
        MessageToast.show("Already booked for this slot");
        return;
    }

    aBookings.push(oBooking);
    oModel.setProperty("/bookings", aBookings);

    MessageToast.show("Slot Booked Successfully");
},

   onReset: function () {

    this.byId("resource").setSelectedKey("");
    this.byId("emp").setSelectedKey("");
    this.byId("dept").setValue("");
    this.byId("date").setValue("");
    this.byId("time").setValue("");
    this.byId("capacity_of_members").setValue("");

    sap.m.MessageToast.show("Reset Done");
},

    });

});