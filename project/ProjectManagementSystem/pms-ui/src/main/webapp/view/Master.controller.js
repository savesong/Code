jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("com.www.util.Controller");

com.www.util.Controller.extend("com.www.view.Master", function() {
  "use strict";

  var menuViewMap = {};

  return {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to
     * modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * 
     * @memberOf view.ProjectList
     */
    onInit : function() {
      this.oInitialLoadFinishedDeferred = jQuery.Deferred();

      this.getView().byId("list").attachEventOnce("updateFinished", function() {
        this.oInitialLoadFinishedDeferred.resolve();
        oEventBus.publish("Master", "InitialLoadFinished");
      }, this);

      var oEventBus = this.getEventBus();
      // oEventBus.subscribe("Detail", "TabChanged",
      // this.onDetailTabChanged, this);

      // on phones, we will not have to select anything in
      // the list so we don't need to attach to events
      if (sap.ui.Device.system.phone) {
        return;
      }

      this.getRouter().getRoute("main").attachPatternMatched(this.onRouteMatched, this);

      // oEventBus.subscribe("Detail", "Changed",
      // this.onDetailChanged, this);
      // oEventBus.subscribe("Detail", "NotFound",
      // this.onNotFound, this);
      oEventBus.subscribe("Master", "FirstItemSelected", this.onFirstItemSelected, this);
    },

    onRouteMatched : function(oEvent) {
      var i18nModel = this.getView().getModel("i18n");
      menuViewMap[i18nModel.getProperty("projectManagement")] = {
        routeName : "project"
      };
      menuViewMap[i18nModel.getProperty("testManagement")] = {
        routeName : "test"
      };
      // Load the detail view in desktop
      this.getRouter().myNavToWithoutHash({
        currentView : this.getView(),
        targetViewName : "com.www.view.Detail",
        targetViewType : "XML"
      });

      // Wait for the list to be loaded once
      this._waitForInitialListLoading(function() {

        // On the empty hash select the first item
        var oFirstItem = this._selectFirstItem();

        if (oFirstItem) {

          // inform the detail view that the first
          // item is selected so the detail view
          // displays the correct data
          this.getEventBus().publish("Master", "FirstItemSelected", oFirstItem);

        }

      });

    },

    onDetailChanged : function(sChanel, sEvent, oData) {
      var sProductPath = oData.sProductPath;
      // Wait for the list to be loaded once
      this._waitForInitialListLoading(function() {
        var oList = this.getView().byId("list");

        var oSelectedItem = oList.getSelectedItem();
        // the correct item is already selected
        if (oSelectedItem && oSelectedItem.getBindingContext().getPath() === sProductPath) {
          return;
        }

        var aItems = oList.getItems();

        for (var i = 0; i < aItems.length; i++) {
          if (aItems[i].getBindingContext().getPath() === sProductPath) {
            oList.setSelectedItem(aItems[i], true);
            break;
          }
        }
      });
    },

    onNotFound : function() {
      this.getView().byId("list").removeSelections();
    },

    onFirstItemSelected : function(eventSrc, eventName, oItem) {
      this._showDetail(oItem);
      console.log("fist item selected!");
    },

    onSelect : function(oEvent) {
      this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
    },

    onPressLogBtn : function() {
    },

    _waitForInitialListLoading : function(fnToExecute) {
      jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(fnToExecute, this));
    },

    _selectFirstItem : function() {
      var oList = this.getView().byId("list");
      var aItems = oList.getItems();
      if (aItems.length) {
        oList.setSelectedItem(aItems[0], true);
        return aItems[0];
      }
    },

    _showDetail : function(oItem) {
      var title = oItem.getProperty("title");
      var route = menuViewMap[title].routeName;
      var param = menuViewMap[title].param || {};
      var bReplace = jQuery.device.is.phone ? false : true;
      this.getRouter().navTo(route, param, bReplace);
    }
  };
}());
