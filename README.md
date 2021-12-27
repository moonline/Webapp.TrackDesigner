# Track designer

A webapp to create and export l-gauge layouts with streets, railroads and tracks.

![Trackdesigner screenshot](Documentation/screenshot1.png)


## Download release

1. Download from [github.com/moonline/Webapp.Trackdesigner/releases](https://github.com/moonline/Webapp.Trackdesigner/releases)
2. Unzip the package
3. Open [index.html](index.html) within your webbrowser or start a local webserver with `http-server .` and open [localhost:8080](http://localhost:8080) in your webbrowser.

## License

<a rel="license" href="http://www.gnu.org/copyleft/gpl.html"><img alt="GPLv3" style="border-width:0" src="http://www.gnu.org/graphics/gplv3-88x31.png" /></a><br />This work is licensed under the <a rel="license" href="http://www.gnu.org/licenses/gpl-3.0-standalone.html">GNU GENERAL PUBLIC LICENSE 3.0</a>

## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* Zip

### Install dependencies

```sh
yarn install
```

### Compile source

`yarn compile`

### Package app

1. Create a package: `zip -r Webapp.Trackdesigner.zip Webapp.TrackDesigner/ -x "*.git" "*.git*" "*.odg" "*.ts" "*.~" "*.asta" "*/Test/*"`
2. Create a minimal manifest
3. Deploy manifest + package to a marketplace


### Run app

Open [index.html](index.html) in your webbrowser or serve by a local webserver `http-server .`.
