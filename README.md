# Installation

## Bootstrap

Project uses [`nvm`](https://github.com/creationix/nvm) to set the supported node version.

```
nvm use
npm install
```

## Usage

### Server

Run:

```
npm start
```

The server will be available on port 3000 or the port specified by the environment
variable `PORT`.

### Endpoints

| **endpoint**                  | **about**                                                        |
|-------------------------------|------------------------------------------------------------------|
| `/`                           | lists discovered devices.  can be used as a server health check. |
| `/control/scan`               | start scanning for devices. returns success of scan **start**.  The server will continue to scan for 30 seconds. |
| `/control/<address>/connect`  | connect to any discovered device.  A device must be discovered in order to connect to it. |
| `/control/<address>/feed`     | send command `CMD-FEED` to the device.  assuming it is a valid pet tutor device, it will begin dispensing. |


