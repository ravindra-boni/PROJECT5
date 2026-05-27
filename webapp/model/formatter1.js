sap.ui.define([], function () {
    "use strict";

    return {

        formatSalary: function (value) {
            return "₹ " + value;
        },

        formatRole: function (role) {
            return "Role: " + role;
        }

    };
});