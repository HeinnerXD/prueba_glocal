sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("takeshiprueba_glocal.controller.characters", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			this.oRouter.getRoute("characters").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {
			sap.ui.core.BusyIndicator.hide();
			var that = this;
			this.table = this.getView().byId("oTableCharacters");
			this.table.removeAllColumns();
			this.table.removeAllItems();
			var oArgs = oEvent.getParameter("arguments");
			this.oArgsData = oArgs.data;
			this.getView().byId("pageCharacter").setTitle("Rick and Morthy API - " + oArgs.data);
			var path = this.getView().getModel("i18n").getResourceBundle().getText("urlApi");
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: path,
				dataType: "json",
				async: false,
				success: function(data, textStatus, jqXHR) {
					var titles = Object.keys(data);
					var links = Object.values(data);
					var arrayData = [];
					for (var i = 0; i < titles.length; i++) {
						var json = {
							name: titles[i],
							link: links[i]
						};
						arrayData.push(json);
					}
					for (var j = 0; j < arrayData.length; j++) {
						if (that.oArgsData === arrayData[j].name) {
							that.UrlSend = arrayData[j].link;
						}
					}

				}
			});
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: that.UrlSend,
				dataType: "json",
				async: false,
				success: function(data, textStatus, jqXHR) {
					var titles = Object.keys(data.results[0]);
					var datas = Object.values(data.results[0]);
					for (var i = 0; i < titles.length; i++) {
						if (typeof datas[i] === "string") {
							var oCol = new sap.m.Column({
								header: new sap.m.Label({
									text: titles[i]
								}),
								hAlign: "Left"
							});
							that.table.addColumn(oCol);
						}
					}
					for (var j = 0; j < data.results.length; j++) {
						var row = new sap.m.ColumnListItem();
						var dataRow = Object.values(data.results[j]);
						for (var k = 0; k < dataRow.length; k++) {
							if (typeof dataRow[k] === "string") {
								if (titles[k] === "image") {
									row.addCell(
										new sap.m.Image({
											src: dataRow[k],
											height: "5em",
											width: "5em"
										})
									);

								} else {
									row.addCell(
										new sap.m.ObjectIdentifier({
											text: dataRow[k]
										})
									);
								}
							}
						}
						that.table.addItem(row);
					}
				}
			});
		},

		onNavBack: function() {
			this.oRouter.navTo("main", true);
		}

	});

});