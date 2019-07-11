sap.ui.define([
    './BaseController',
    "jquery.sap.global",
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer",
    "sap/ui/model/json/JSONModel"
], function (BaseController, Query, Controller, PDFViewer, JSONModel) {
    "use strict";
    return BaseController.extend("sap.ui.demo.toolpageapp.controller.Chart", {

        onInit: function () {
            this._pdfViewer = new PDFViewer();
            this.getView().addDependent(this._pdfViewer);

            var oSample1Model = new JSONModel({
                Source: "https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/PDFViewerEmbedded/sample.pdf",
                Preview: "https://previews.123rf.com/images/dxinerz/dxinerz1509/dxinerz150901395/45612375-pdf-%ED%8C%8C%EC%9D%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg"
            });
            var oSample2Model = new JSONModel({
                Source: "https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/PDFViewerEmbedded/sample.pdf",
                Preview: "https://previews.123rf.com/images/dxinerz/dxinerz1509/dxinerz150901395/45612375-pdf-%ED%8C%8C%EC%9D%BC-%EC%95%84%EC%9D%B4%EC%BD%98.jpg"
            });

            this.byId('image1').setModel(oSample1Model);
            this.byId('image2').setModel(oSample2Model);
        },

        onPress: function (oEvent) {
            var sSource = oEvent.getSource().getModel().getData().Source;
            this._pdfViewer.setSource(sSource);
            this._pdfViewer.setTitle("pdf title");
            this._pdfViewer.open();
        }
    })
});