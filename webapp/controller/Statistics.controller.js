sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	"sap/ui/VersionInfo",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/demo/toolpageapp/libs/moment",
	"sap/ui/demo/toolpageapp/libs/tuiChart",
], function (BaseController, JSONModel, VersionInfo, XMLView) {
	"use strict";
	return BaseController.extend("sap.ui.demo.toolpageapp.controller.Statistics", {
		onInit: function () {
			var chartData = [ {id:'barChart'}, {id:'columnChart'}, {id:'lineChart'} ]
			var chartDiv;
			var view = this.getView()

			chartData.map(function(data, index){
				chartDiv = new sap.ui.core.HTML(`${data.id}`);
				chartDiv.setDOMContent(`<div id="${data.id}" style="overflow-y: hidden;"></div>`)
				view.byId(`${data.id}`+'Container').addContent(chartDiv)
			})
		},

		onBeforeRendering : function(){

			var chartData = [
				{
					status:"barChart",
					id:$("#barChart")[0],
					data:{
						categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
						series: [{
							name: 'Budget',
							data: [5000, 3000, 5000, 7000, 6000, 4000]
						},{
							name: 'Income',
							data: [8000, 1000, 7000, 2000, 5000, 3000]
						}]
					},
					options : {
						chart: {width: 700, height: 400}
					}
				},
				{
					status:"columnChart",
					id:$("#columnChart")[0],
					data:{
						categories: ['June, 2015', 'July, 2015', 'August, 2015', 'September, 2015', 'October, 2015', 'November, 2015', 'December, 2015'],
						series: [
							{
								name: 'Budget',
								data: [5000, 3000, 5000, 7000, 6000, 4000, 1000]
							},
							{
								name: 'Income',
								data: [8000, 1000, 7000, 2000, 6000, 3000, 5000]
							},
							{
								name: 'Expenses',
								data: [4000, 4000, 6000, 3000, 4000, 5000, 7000]
							},
							{
								name: 'Debt',
								data: [6000, 3000, 3000, 1000, 2000, 4000, 3000]
							}
						]
					},
					options : {
						chart: {
							width: 700,
							height: 400,
							title: 'Monthly Revenue',
							format: '1,000'
						},
						yAxis: {
							title: 'Amount',
							min: 0,
							max: 9000
						},
						xAxis: {
							title: 'Month'
						},
						legend: {
							align: 'top'
						}
					}
				},
				{
					status:"lineChart",
					id:$("#lineChart")[0],
					data:{
						categories: ['01/01/2016', '02/01/2016', '03/01/2016', '04/01/2016', '05/01/2016', '06/01/2016', '07/01/2016', '08/01/2016', '09/01/2016', '10/01/2016', '11/01/2016', '12/01/2016'],
						series: [
							{
								name: 'Seoul',
								data: [-3.5, -1.1, 4.0, 11.3, 17.5, 21.5, 24.9, 25.2, 20.4, 13.9, 6.6, -0.6]
							},
							{
								name: 'Seattle',
								data: [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.4, 3.7]
							},
							{
								name: 'Sydney',
								data: [22.1, 22.0, 20.9, 18.3, 15.2, 12.8, 11.8, 13.0, 15.2, 17.6, 19.4, 21.2]
							},
							{
								name: 'Moskva',
								data: [-10.3, -9.1, -4.1, 4.4, 12.2, 16.3, 18.5, 16.7, 10.9, 4.2, -2.0, -7.5]
							},
							{
								name: 'Jungfrau',
								data: [-13.2, -13.7, -13.1, -10.3, -6.1, -3.2, 0.0, -0.1, -1.8, -4.5, -9.0, -10.9]
							}
						]
					},
					options:{
						chart: {
							width: 700,
							height: 400,
							title: '24-hr Average Temperature'
						},
						yAxis: {
							title: 'Temperature (Celsius)',
						},
						xAxis: {
							title: 'Month',
							pointOnColumn: true,
							dateFormat: 'MMM',
							tickInterval: 'auto'
						},
						series: {
							showDot: false,
							zoomable: true
						},
						tooltip: {
							suffix: '°C'
						},
						plot: {
							bands: [
								{
									range: ['03/01/2016', '05/01/2016'],
									color: 'gray',
									opacity: 0.2
								}
							],
							lines: [
								{
									value: '03/01/2016',
									color: '#fa2828'
								}
							]
						}
					}
				}
			]

			chartData.map(function(chart,index){
				if(chart.status === 'barChart'){
					tui.chart.barChart(chart.id, chart.data, chart.options);
				}
				if(chart.status === 'columnChart'){
					tui.chart.columnChart(chart.id, chart.data, chart.options);
				}
				if(chart.status === 'lineChart'){
					tui.chart.lineChart(chart.id, chart.data, chart.options);
				}
			})
		},

		onAfterRendering : function(){
		}

	});
});