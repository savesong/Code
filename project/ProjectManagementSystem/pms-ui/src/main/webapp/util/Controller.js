jQuery.sap.declare("com.www.util.Controller");

sap.ui.core.mvc.Controller.extend("com.www.util.Controller", {

  getEventBus: function() {
    return this.getOwnerComponent().getEventBus();
  },

  getRouter: function() {
    return sap.ui.core.UIComponent.getRouterFor(this);
  }
});
