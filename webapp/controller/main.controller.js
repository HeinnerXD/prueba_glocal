sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("takeshiprueba_glocal.controller.main", {
		onInit: function() {
			var that = this;
			var path = "https://rickandmortyapi.com/api";
			var aData = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: path,
				dataType: "json",
				async: false,
				success: function(data, textStatus, jqXHR) {
					that._dataEscritos = {
						escritosData: [data]
					};
					that.jModelEscritos = new sap.ui.model.json.JSONModel();
					that.jModelEscritos.setData(that._dataEscritos);
					that.getView().setModel(that.jModelEscritos, "escritosData");
					console.log(data[0]);
				}
			});
		},
		handlePress: function(evt) {
			console.log("press button");
		}
	});
});