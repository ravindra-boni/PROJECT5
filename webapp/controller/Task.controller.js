sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, ODataModel, JSONModel) {

    "use strict";

    return Controller.extend("project5.controller.Task", {

        onInit: function () {
        
            var oModel = new ODataModel("/sap/opu/odata/sap/ZTRAIN_BOOKING_SRV/", {
                useBatch: false
            });

            this.getView().setModel(oModel);

            // LOCAL MODEL
            var oLocalModel = new JSONModel({

                department: [
                    { department: "HR" },
                    { department: "OPERATIONS" },
                    { department: "ASSISTANTS" },
                    { department: "CONSULTANT" },
                    { department: "JAVA" },
                    { department: "TRAINEE" }
                ],

                slot09: false,
                slot10: false,
                slot11: false,
                slot12: false

            });

            this.getView().setModel(oLocalModel, "local");
        },

        // SLOT SELECT
        onSelectSlot: function (oEvent) {

            var sTime = oEvent.getSource().getText();
            var sType = oEvent.getSource().getType();

            if (sType === "Reject") {
                MessageToast.show("Slot Already Booked");
                return;
            }

            this.byId("time").setValue(sTime);

            MessageToast.show("Slot Selected: " + sTime);
        },

        // BOOK SLOT
        onBook: function () {

            var oModel = this.getView().getModel();
            var oDate = this.byId("date").getDateValue();
            var oBooking = {

                Employee: this.byId("emp").getValue(),

                Department: this.byId("dept").getSelectedKey(),

                BookDate: oDate
                    ? oDate.toISOString().split("T")[0] + "T00:00:00"
                    : null,

                BookTime: this.byId("time").getValue(),

                Capacity: parseInt(
                    this.byId("capacity_of_members").getValue(),
                    10
                )
            };

            console.log("SENDING:", oBooking);

            oModel.create("/BookingSet01", oBooking, {

                success: function () {

                    MessageToast.show("Booking Successful");

                    var oLocal = this.getView().getModel("local");

                    var sTime = this.byId("time").getValue();

                    // RED COLOR FOR BOOKED SLOT
                    if (sTime === "09:00 AM") {
                        oLocal.setProperty("/slot09", true);
                    }

                    if (sTime === "10:00 AM") {
                        oLocal.setProperty("/slot10", true);
                    }

                    if (sTime === "11:00 AM") {
                        oLocal.setProperty("/slot11", true);
                    }

                    if (sTime === "12:00 PM") {
                        oLocal.setProperty("/slot12", true);
                    }

                }.bind(this),

                error: function (err) {

                    console.log("ERROR:", err);
                    MessageToast.show("Booking Failed");
                }
            });
        },

        // FETCH ALL BOOKINGS
        onFetchBookedSlots: function () {

            var oModel = this.getView().getModel();

            oModel.read("/BookingSet01", {

                success: function (oData) {
                    MessageToast.show(
                        "Total Bookings: " + oData.results.length
                    );
                    console.log("ALL BOOKINGS:", oData.results);
                },

                error: function (oError) {
                    MessageToast.show("Fetch Failed");
                    console.log(oError);
                }
            });
        },

        // RESET
        onReset: function () {
            this.byId("resource").setSelectedKey("");
            this.byId("emp").setValue("");
            this.byId("dept").setSelectedKey("");
            this.byId("date").setValue("");
            this.byId("time").setValue("");
            this.byId("capacity_of_members").setValue("");

            MessageToast.show("Reset Done");
        }

    });

});