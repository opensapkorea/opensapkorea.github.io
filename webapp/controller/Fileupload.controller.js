var str;
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
    return BaseController.extend("sap.ui.demo.toolpageapp.controller.Fileupload", {

        onUploadPress: function(){
            var oTable = this.getView().byId("itemsTable");
            var ofileUploader = this.getView().byId("fileUploader")
            if(!ofileUploader.getValue()){
                MessageToast.show("choose a file first")
            }else {
                var file = ofileUploader.getFocusDomRef().files[0];
                if(file && window.FileReader){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        var strCSV = e.target.result;
                        str = strCSV
                        // var testCsv = e.target.result;
                        // var arrCsv = testCsv.split(/\r?\n|\r/);
                        // var title = 4;
                        // var testData = [];
                        // arrCsv.map(function(data,i){
                        //     let row = data.split(',')
                        //     row.map(function(row, row_index){
                        //         console.log(row)
                        //     })
                        //     // data.split(',').map(function(zz,index){
                        //     //     console.log(zz)
                        //     // })
                        // })
                        // console.log(testData)
                        var arrCSV = strCSV.match(/[\w|\- .]+(?=,?)/g);
                        var noOfCols = 4;
                        var hdrRow = arrCSV.splice(0, noOfCols);
                        // console.log(hdrRow)
                        var data = [];
                        while (arrCSV.length > 0){
                            var obj = {};
                            var row = arrCSV.splice(0, noOfCols);
                            // console.log(row)
                            for (var i = 0; i < row.length; i++){
                                obj[hdrRow[i]] = row[i].trim();
                            }
                            data.push(obj)
                        }
                        console.log(data)
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(data);
                        oTable.setModel(oModel)
                    };
                    reader.readAsBinaryString(file)
                }
            }
        },

        onSubmit: function () {
            var oEntry = this.mapoEntry();
        },

        mapoEntry: function(){
            var oTable = this.getView().byId("itemsTable");
            var oModel = oTable.getModel("model");
            console.log(oModel)
            // var oData =  oTable.getModel("model");
            var oEntry = {};
            for (var i = 0; i < oModel.length; i++){
                var obj = oModel[i];
                switch (obj.ITEM) {
                    case "Description 1":
                        oEntry.FirstItemDescription = obj.ITEM;
                        oEntry.FirstAmount = obj.AMOUNT;
                        break;
                    case "Description 2":
                        oEntry.SecondItemDescription = obj.ITEM;
                        oEntry.SecondAmount = obj.AMOUNT;
                        break;
                    default:
                }
            }
            console.log(oEntry)
        }
    });
});
