jQuery.sap.declare("com.www.smartx.util.Controller");

sap.ui.core.mvc.Controller.extend("com.www.smartx.util.Controller", {

  getEventBus: function() {
    return this.getOwnerComponent().getEventBus();
  },

  getRouter: function() {
    return sap.ui.core.UIComponent.getRouterFor(this);
  }
});
