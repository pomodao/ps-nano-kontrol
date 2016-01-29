# ps-nano-kontrol
Adobe Photoshop Generator plug-in for KORG nanoKONTROL/2

[![Adobe Photoshop Generator plug-in for KORG nanoKONTROL/2](https://pbs.twimg.com/ext_tw_video_thumb/691149763895382016/pu/img/rGw1Rb9c208pyfvc.jpg)](https://twitter.com/pomo/status/691150058520051713)  
Click to watch demo video.

## Prerequesites

- Adobe Photoshop CC (only tested on CC 2015)
  - Make sure that "Enable Generator" and "Enable Remote Connections" are checked in the Photoshop Preferences > Plug-ins panel.
- node.js and npm
- Python 2.7 and C compiler to build [midi](https://www.npmjs.com/package/midi) package with node-gyp (on Windows, see [the instructions](https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245).)

## Setup

```bash
$ git clone https://github.com/pomodao/ps-nano-kontrol.git
$ cd ps-nano-kontrol
$ npm install
$ npm start
```

## Configuration

See app-config.json and actions.js.

(further documents may be written later.)
