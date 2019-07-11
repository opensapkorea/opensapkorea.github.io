sap.ui.define([
    './BaseController',
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageBox',
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    "sap/ui/core/format/DateFormat"
], function (BaseController, Controller, MessageBox, JSONModel, MessageToast, Export, ExportTypeCSV, DateFormat) {
    "use strict";
    return BaseController.extend("sap.ui.demo.toolpageapp.controller.GridTable", {
        onInit: function () {
            var oViewModel  = this.getOwnerComponent().getModel("products");

            this.setModel(oViewModel, "products");
        },
        formatAvailableToObjectState : function(bAvailable) {
            return bAvailable ? "Success" : "Error";
        },
        formatAvailableToIcon : function(bAvailable) {
            return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
        },
        handleDetailsPress : function(oEvent) {
            var getObjectId = oEvent.getSource().getBindingContext("products").getObject().ProductId;
            MessageToast.show("Details for product with id " + getObjectId);
        },
        onDataExport : function(oEvent) {

            console.log(this.getOwnerComponent().getModel("products"))

            var oExport = new Export({

                // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                exportType : new ExportTypeCSV({
                    separatorChar : ",",
                    charset: "utf-8",
                    byteOrderMark : true
                }),

                // Pass in the model created above
                models :  this.getModel("products"),
                //
                // binding information for the rows aggregation
                rows : {
                    path : "/ProductCollection"
                },

                // column definitions with column name and binding info for the content

                columns : [{
                    name : "Product",
                    template : {
                        content : "{Name}"
                    }
                }, {
                    name : "Product ID",
                    template : {
                        content : "{ProductId}"
                    }
                }, {
                    name : "Supplier",
                    template : {
                        content : "{SupplierName}"
                    }
                }, {
                    name : "Price",
                    template : {
                        content : "{Price} {CurrencyCode}"
                    }
                }]
            });

            // download exported file
            oExport.saveFile("please!!").catch(function(oError) {
                MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
            }).then(function() {
                oExport.destroy();
            });
        },

    });
});