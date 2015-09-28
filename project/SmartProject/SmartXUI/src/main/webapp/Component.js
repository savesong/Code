jQuery.sap.require("com.www.smartx.MyRouter");
jQuery.sap.require("com.www.smartx.util.Formatter");

sap.ui.core.UIComponent.extend("com.www.smartx.Component", {

  metadata : {
    name : "Project Management System",
    version : "1.0",
    includes : [],
    dependencies : {
      libs : [ "sap.m", "sap.ui.layout" ],
      components : []
    },
    rootView : "com.www.smartx.view.App",
    config : {
      resourceBundle : "i18n/i18n.properties",
      serviceConfig : {}
    },
    routing : {
      config : {
        routerClass : com.www.smartx.MyRouter,
        viewType : "XML",
        viewPath : "com.www.smartx.view",
        targetAggregation : "detailPages",
        clearTarget : false
      },
      routes : [ {
        pattern : "",
        name : "main",
        view : "Master",
        targetAggregation : "masterPages",
        targetControl : "idAppControl",
        subroutes : [ {
          pattern : "Project",
          name : "project",
          view : "ProjectList"
        }, {
          pattern : "ProjectDetail",
          name : "ProjectDetail",
          view : "ProjectDetail"
        }, {
          pattern : "ProjectAdd",
          name : "ProjectAdd",
          view : "ProjectAdd"
        }, {
          pattern : "Test",
          name : "test",
          view : "Test"
        } ]
      }, {
        name : "nothingMaster",
        view : "Master",
        targetAggregation : "masterPages",
        targetControl : "idAppControl",
        subroutes : [ {
          pattern : ":all*:",
          name : "nothingDetail",
          view : "NotFound",
          transition : "show"
        } ]
      } ]
    }
  },

  init : function() {
    // call the init function of the parent
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

    var mConfig = this.getMetadata().getConfig();

    // always use absolute paths relative to our own component
    // (relative paths will fail if running in the Fiori Launchpad)
    var rootPath = jQuery.sap.getModulePath("com.www.smartx");

    // set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl : [ rootPath, mConfig.resourceBundle ].join("/")
    });
    this.setModel(i18nModel, "i18n");
    sap.ui.getCore().setModel(i18nModel, "i18n");

    // com.www.smartx.service.i18n.setLocalizationHelper(i18nModel);
    // var sServiceUrl = mConfig.serviceConfig.serviceUrl;

    // //This code is only needed for testing the application when there is
    // no local proxy available, and to have stable test data.
    // var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") ===
    // "true";
    // // start the mock server for the domain model
    // if (bIsMocked) {
    // this._startMockServer(sServiceUrl);
    // }

    // Create and set domain model to the component
    var oModel = new sap.ui.model.json.JSONModel({
      MenuItems : [ {
        Name : i18nModel.getProperty("projectManagement")
      }, {
        Name : i18nModel.getProperty("testManagement")
      } ]
    });
    this.setModel(oModel);

    // set device model
    var oDeviceModel = new sap.ui.model.json.JSONModel({
      isTouch : sap.ui.Device.support.touch,
      isNoTouch : !sap.ui.Device.support.touch,
      isPhone : sap.ui.Device.system.phone,
      isNoPhone : !sap.ui.Device.system.phone,
      listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
      listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
    });
    oDeviceModel.setDefaultBindingMode("OneWay");
    this.setModel(oDeviceModel, "device");

    this.getRouter().initialize();
  }

});