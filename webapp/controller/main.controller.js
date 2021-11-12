sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("takeshiprueba_glocal.controller.main", {
		
		onInit: function() {
			var that = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			this.oRouter.getRoute("main").attachMatched(this._onRouteMatched, this);
			var path = "https://rickandmortyapi.com/api";
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
					that._dataEscritos = {
						escritosData: arrayData
					};
					that.jModelEscritos = new sap.ui.model.json.JSONModel();
					that.jModelEscritos.setData(that._dataEscritos);
					that.getView().setModel(that.jModelEscritos, "escritosData");
				}
			});
		},

		_onRouteMatched: function(oEvent) {

		},
		
		handlePress: function(evt) {
			sap.ui.core.BusyIndicator.show(1);
			var selectedItem = evt.getSource().getBindingContext("escritosData").getObject();
			this.oRouter.navTo("characters", {
				data: selectedItem.name
			}, true);
		}
		
	});
	
});