jQuery.sap.require("com.www.smartx.util.Controller");

com.www.smartx.util.Controller.extend("com.www.smartx.view.RequestDetail", {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to
   * modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf view.ProjectList
   */
  onInit : function() {
    var configModel = new sap.ui.model.json.JSONModel({
      "editable" : false,
      "bEnableSave" : false
    });
    // @@
    this.getView().setModel(configModel, "config");

    var oModel = new sap.ui.model.json.JSONModel({
      id : 1,
      attr1 : "1attr1111111",
      attr2 : "1attr222222222222",
      attr3 : "1attr33333333333",
      attr4 : "1attr4444444444",
      attr5 : "1attr555555",
      attr6 : "1attr66666666666",
      attr7 : "1attr777777777777",
      attr8 : "1attr888888888",
      attr9 : "1attr999999999999999"
    });
    // @@
    oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
    this.getView().setModel(oModel);
  },

  onNavButtonPress : function(oControlEvent) {
    this._toFormViewMode();
    this.getRouter()._navBack("ProjectList");
  },

  onEditProject : function() {
    this._toFormEditMode();
  },

  onSaveEditedProject : function() {
    this._toFormViewMode();
    // save data
    this.getRouter()._navBack("ProjectList");
  },

  _toFormEditMode : function(oControlEvent) {
    this.getView().getModel("config").setProperty('/editable', true);
    this.getView().getModel("config").setProperty('/bEnableSave', true);
  },

  _toFormViewMode : function(oControlEvent) {
    this.getView().getModel("config").setProperty('/editable', false);
    this.getView().getModel("config").setProperty('/bEnableSave', false);
  }

});