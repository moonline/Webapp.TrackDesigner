# Track designer

A webapp to create and export l-gauge layouts with streets, railroads and tracks.

![Trackdesigner screenshot](Documentation/screenshot1.png)

Try it out: [moonline.github.io/Webapp.TrackDesigner](https://moonline.github.io/Webapp.TrackDesigner/)


## Download release

1. Download from [github.com/moonline/Webapp.Trackdesigner/releases](https://github.com/moonline/Webapp.Trackdesigner/releases)
2. Unzip the package
3. Open [index.html](index.html) in your webbrowser or start a local webserver with `http-server .` and open [localhost:8080](http://localhost:8080) in your webbrowser.

## License

<a rel="license" href="http://www.gnu.org/copyleft/gpl.html"><img alt="GPLv3" style="border-width:0" src="http://www.gnu.org/graphics/gplv3-88x31.png" /></a><br />This work is licensed under the <a rel="license" href="http://www.gnu.org/licenses/gpl-3.0-standalone.html">GNU GENERAL PUBLIC LICENSE 3.0</a>

## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* Zip: `sudo apt install zip`

### Install dependencies

```sh
yarn install
```

### Compile source

```sh
yarn compile
```

### Run app

Open [index.html](index.html) in your webbrowser or start a local webserver with `http-server .` and open [localhost:8080](http://localhost:8080) in your webbrowser.


### Package app

```sh
yarn package
```
