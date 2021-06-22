{// ================= Call Plugin Library =================
  const CALL_VERSION = "0.1.0";
  if (typeof PalmdaClient !== "function") {
    throw new Error('E6 PalmdaClient is not defined. Call Plugin Library should be added to the page after PalmdaClient is defined.');
  }

  if (typeof PalmdaClient.prototype.incomingCall === "function") {
    throw new Error(`E7 PalmdaCallClient is already defined. Existing version: '${window.PalmdaClient.callVersion}' and this version: '${VERSION}'.`);
  }

  // All phone numbers are in E164 format (+905051234567)
  function init() {

    PalmdaClient.prototype.call = {
      incomingCall: function (phoneNumber) {
        sendMessage({id: 'pluginId', type: 'incomingCall', auth: 'token', data: {phoneNumber: phoneNumber}});
      },
      answeredCall: function (phoneNumber) {
        sendMessage({id: 'pluginId', type: 'answeredCall', auth: 'token', data: {phoneNumber: phoneNumber}});
      },
      endedCall: function (phoneNumber) {
        sendMessage({id: 'pluginId', type: 'endedCall', auth: 'token', data: {phoneNumber: phoneNumber}});
      },
      validateImplementation: function() {
        debugger
        console.log(this)
      }
    };

    Object.defineProperty(PalmdaClient.instance(), 'callVersion', {
      value: CALL_VERSION,
      writable: false
    });
  }

  init();

  console.log(`PalmdaCallClient v${CALL_VERSION} (using PalmdaClient v${PalmdaClient.instance().version}) initialized successfully.`)
}// end of client library

/*
  function waitForPalmdaClient(){
    if(typeof PalmdaClient !== "undefined"){
        init();
    }
    else{
      console.warn("Waiting for PalmdaClient to be defined. This shouldn't ");
        setTimeout(waitForElement, 50);
    }
  }
*/
