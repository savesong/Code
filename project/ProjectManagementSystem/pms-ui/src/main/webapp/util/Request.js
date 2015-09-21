jQuery.sap.require("com.www.util.Config");

jQuery.sap.declare("com.www.util.Request");

com.www.util.Request = {

  ajaxRequest : function(oSettings) {
    if (oSettings) {
      var sUrl = com.www.util.Config.getServiceBaseUrl() + oSettings.path;
      var jqXHR = jQuery.ajax(sUrl, {
        async : oSettings.async ? oSettings.async : true,
        cache : oSettings.cache ? oSettings.cache : false,
        contentType : oSettings.contentType ? oSettings.contentType : "application/json;charset=UTF-8",
        dataType : oSettings.dataType ? oSettings.dataType : "json",
        crossDomain : oSettings.crossDomain ? oSettings.crossDomain : false,
        data : (oSettings.formatJSON && oSettings.formatJSON == false) ? oSettings.data : JSON
            .stringify(oSettings.data),
        dataFilter : function(data, type) {
          if (data == "") {
            data = "{}";
          }
          return data;
        },
        headers : oSettings.headers ? oSettings.headers : {
          Accept : "application/json;odata=light"
        },
        type : oSettings.type ? oSettings.type : "GET",
        success : oSettings.success ? oSettings.success : function() {
        },
        error : oSettings.error ? oSettings.error : function(jqXHR, textStatus, errorThrown) {
          // authorization fail, redirect to login.
          var rsJSON = jqXHR.responseJSON;
          if (rsJSON && rsJSON.error
          // && rsJSON.error.code == csm.js.util.constants.ERROR_CODE.AUTHORIZATION_FAIL
          ) {
            // csm.js.util.util.removeOperatorStorage();
            location.replace(com.www.util.Config.getApplicationBaseUrl());
          } else {
            // app.getNotificationView().addErrorMsg(jqXHR, this.url);

            if (oSettings.caller) {
              oSettings.caller.unlock();
            }
          }
        }
      });

      if (oSettings.always) {
        jqXHR.always(oSettings.always);
      }
    }
  },

  loadData : function(oSettings) {
    if (oSettings.view) {
      var oView = oSettings.view;
      oSettings.always = function() {
        oView.setBusy(false);
      };
      oView.setBusy(true);
      this.ajaxRequest(oSettings);
    } else {
      this.ajaxRequest(oSettings);
    }
  }
};