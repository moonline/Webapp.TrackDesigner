# Track designer

An app to create l-gauge layouts with streets, railroads and tracks.

![Trackdesigner screenshot](Documentation/screenshot1.png)


## License

<a rel="license" href="http://www.gnu.org/copyleft/gpl.html"><img alt="GPLv3" style="border-width:0" src="http://www.gnu.org/graphics/gplv3-88x31.png" /></a><br />This work is licensed under the <a rel="license" href="http://www.gnu.org/licenses/gpl-3.0-standalone.html">GNU GENERAL PUBLIC LICENSE 3.0</a>


## Download / Packaged releases

1. Download [github.com/moonline/Webapp.Trackdesigner/releases](https://github.com/moonline/Webapp.Trackdesigner/releases)
2. Unzip to a folder of your choice
3. Open `index.html` with your webbrowser



## Compile from source

### Compile app

1. Install Node.js and yarn
2. Install dependencies `yarn install`
2. Compile `yarn tsc Main.ts --module AMD`


### Package app

1. Create a package: `zip -r Webapp.Trackdesigner.zip Webapp.TrackDesigner/ -x "*.git" "*.git*" "*.odg" "*.ts" "*.~" "*.asta" "*/Test/*"`
2. Create a minimal manifest
3. Deploy manifest + package to a marketplace


### Run app

Open [index.html](index.html) in your webbrowser or serve by a local webserver `http-server`.