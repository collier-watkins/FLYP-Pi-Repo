'use strict';

var HID = require("node-hid");
const EventEmitter = require("events");

class USBProvider extends EventEmitter {

  constructor() {

    super();
    var self = this;

    this.onerror = function(e) {
      console.log( "ERROR: " + e );
    };

    this.getDeviceHandle = function() {
      return deviceHandle;
    };

    var SCAN_INTERVAL = 2000; // in ms
    var VENDOR_ID = 0xACD; // default vendor id
    //var VENDOR_ID = 0x2049;
    var deviceHandle = null; 
    var deviceRecord = null;
    
    function cycle() {

      var deviceFound = false;
      HID.devices().forEach( function( device, index, records ) {
        
        deviceFound = ( device.vendorId == VENDOR_ID );

        if( device.vendorId == VENDOR_ID && deviceRecord == null ) {

          deviceRecord = device;
          try {

            deviceHandle = new HID.HID( device.vendorId, device.productId );
            deviceHandle.on( "error", self.onerror );
            self.emit( 'usbconnect', deviceHandle );
            console.log( "usbprovider: connect" );

          } catch(e) {

            self.onerror( "Exception:\n" + e );
            self.emit( "usbexception", device );

          }
        }

        if( index == records.length - 1 && !deviceFound ) {

          if( deviceRecord != null ) {

            deviceRecord = deviceHandle = null;
            self.emit( "usbdisconnect" );
            console.log( "usbprovider: disconnect" );

          }

        }

      });

    }

    this.poll = function() {
      setInterval( cycle, SCAN_INTERVAL );
    }

  }

}

//export default USBProvider;
module.exports = USBProvider;
