jQuery.sap.require("com.www.util.Controller");

com.www.util.Controller.extend("com.www.view.ProjectAdd", {

  onSaveProject : function(oControlEvent) {
    // @@ save data
    this.getRouter()._navBack("ProjectList");
  },

  onCancelAddProject : function(oControlEvent) {
    this.getRouter()._navBack("ProjectList", this.getView());
  }

});
