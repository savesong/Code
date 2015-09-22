jQuery.sap.require("com.www.util.Controller");
jQuery.sap.require("com.www.util.Request");

com.www.util.Controller.extend("com.www.view.ProjectList", {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to
   * modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf view.ProjectList
   */
  onInit : function() {
    var oModel = new sap.ui.model.json.JSONModel("./data.json");
    // @@
    oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
    this.getView().setModel(oModel);

    // var sUrl = "/pms-ui/data.json";
    // jQuery.ajax(sUrl).done(function(data, textStatus, jqXHR) {
    // console.error(data);
    // });

    // var that = this;
    // com.www.util.Project.loadData({
    // path : "/ExternalConnect/test",
    // view : this.getView(),
    // success : function(data, textStatus, jqXHR) {
    // var oModel = new sap.ui.model.json.JSONModel("./data.json");
    // that.getView().setModel(oModel);
    // }
    // });
  },

  onCellClick : function(oControlEvent) {
    var oContext = oControlEvent.getParameters().cellControl.getBindingContext();
    if (oContext) {
      var requestId = oContext.getProperty("id")
      if (requestId) {
        this.getRouter().navTo("ProjectDetail", {
          requestId : requestId
        });
      }
    }
  },

  onAddProject : function(oControlEvent) {
    this.getRouter().navTo("ProjectAdd");
  },

  onSearch : function(oControlEvent) {
    var sQuery = oControlEvent.getParameter("query");
    if (sQuery && sQuery.length > 0) {
      var aFilters = [ this._createFilter(sQuery) ];
      this.getView().byId("projectListTable").getBinding("rows").filter(new sap.ui.model.Filter({
        filters : aFilters,
        and : true
      }));
    } else {
      this.getView().byId("requestListTable").getBinding("rows").filter();
    }
  },

  _createFilter : function(keyword) {
    var filters = [ new sap.ui.model.Filter("attr1", sap.ui.model.FilterOperator.Contains, keyword),
        new sap.ui.model.Filter("attr2", sap.ui.model.FilterOperator.Contains, keyword),
        new sap.ui.model.Filter("attr3", sap.ui.model.FilterOperator.Contains, keyword),
        new sap.ui.model.Filter("attr4", sap.ui.model.FilterOperator.Contains, keyword),
        new sap.ui.model.Filter("attr5", sap.ui.model.FilterOperator.Contains, keyword) ];
    if (!isNaN(keyword)) {
      filters.push(new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.EQ, parseInt(keyword)));
    }
    return new sap.ui.model.Filter({
      filters : filters,
      and : false
    });
  }

});
