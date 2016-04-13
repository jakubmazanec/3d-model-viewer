3d-model-viewer
===============

Proof-of-concept stl files viewer in a browser.


## Requirements

- [Node.js](https://nodejs.org) 5.0.0 or higher (tested on 5.10.1 and 5.9.1)


## Install

```
git clone git@github.com:jakubmazanec/3d-model-viewer.git
cd 3d-model-viewer
npm install
npm start
```
Go to ```http://localhost:8008```


## Features & controls

- camera - left mouse + drag rotates the camera, right mouse + drag pans the camera
- model position - left mouse + drag moves the model
- sidebar - buttons for changing position and rotation of the model, input for changing the color (RGB hex format)


## Used technologies

- Full-stack JavsScript
- [Ash framework](https://github.com/Datanautika/ash) - for UI; custom virtual DOM based framework, 3-5 times faster than React
- [Three.js](http://threejs.org) - for WebGL


## License

Copyright 2016 Jakub Mazanec

[The MIT License](./LICENSE)
