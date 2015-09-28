jQuery.sap.require("com.www.smartx.util.Controller");

com.www.smartx.util.Controller.extend("com.www.smartx.view.RequestAdd", {

  onSaveProject : function(oControlEvent) {
    // @@ save data
    this.getRouter()._navBack("ProjectList");
  },

  onCancelAddProject : function(oControlEvent) {
    this.getRouter()._navBack("ProjectList", this.getView());
  }

});
