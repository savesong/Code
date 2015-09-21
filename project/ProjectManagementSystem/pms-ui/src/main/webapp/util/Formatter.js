jQuery.sap.declare("com.www.util.Formatter");

com.www.util.Formatter = {

  statusFormatter : function(status) {
    var i18nModel = sap.ui.getCore().getModel("i18n");
    switch (status) {
      case "Success":
        return i18nModel.getProperty("projectStatusEnumSuccess");
      case "Failure":
        return i18nModel.getProperty("projectStatusEnumFailure");
      default:
        return i18nModel.getProperty("projectStatusEnumProgressing");
    }
  },

  barColorFormatter : function(status) {
    switch (status) {
      case "Success":
        return sap.ui.core.BarColor.POSITIVE;
      case "Failure":
        return sap.ui.core.BarColor.NEGATIVE;
      default:
        return sap.ui.core.BarColor.NEUTRAL;
    }
  },

  progressFormatter : function(percentage) {
    if (isNaN(percentage) || percentage < 0) {
      return 0;
    } else if (percentage > 100) {
      return 99;
    } else {
      return percentage;
    }
  },

  uppercaseFirstChar : function(sStr) {
    return sStr.charAt(0).toUpperCase() + sStr.slice(1);
  },
};
