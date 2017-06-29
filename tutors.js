var lb = require('bean-sdk');
var winston = require('winston');

var sdk = lb.sdk();
var scannedDevices = {};
var devices = {};
var connections = {};

sdk.on('discover', function(device) {
  devices[device.getAddress()] = serialize(device);
  scannedDevices[device.getAddress()] = device;
});

function scan() {
  for (var addr in devices) {
    delete devices[addr];
    delete scannedDevices[addr];
  }
  sdk.startScanning(30, true);
}

function connect(address, cb) {
  var d = scannedDevices[address];
  if (!d) {
    return cb('no such device with address ' + address);
  }
  sdk.connectScannedDevice(d, function(err, bean) {
    if (err) {return cb(err);}

    connections[address] = bean
    devices[address].connected = true
    
    return cb();
  });
}

function feed(address, cb) {
  var bean = connections[address];
  if (!bean) {
    return cb('not connected to ' + address);
  }

  bean.lookupServices(function(err) {
    if (err) {return cb(err);}
    bean.sendSerial(new Buffer('CMD-FEED'), function(err, response) {
      if (err) {return cb(err);}
      return cb(null, response);
    })
  });
}

function serialize(device) {
  return {
    name: device.getName(),
    address: device.getAddress(),
    type: device.getType(),
    connected: false
  };
}

module.exports = {
  Devices : devices,
  scan: scan,
  connect: connect,
  feed: feed
}
