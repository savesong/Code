jQuery.sap.require("com.www.util.Controller");

com.www.util.Controller.extend("com.www.view.RequestAdd", {

  onSaveRequest : function(oControlEvent) {
    // @@ save data
    this.getRouter()._navBack("RequestList");
  },

  onCancelAddRequest : function(oControlEvent) {
    this.getRouter()._navBack("RequestList", this.getView());
  }

});
