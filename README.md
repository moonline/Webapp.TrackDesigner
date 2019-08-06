Track designer
==============

An app to create l-gauge layouts with streets, railroads and tracks.


Download / Packaged releases
----------------------------

1. Download https://github.com/moonline/Webapp.Trackdesigner/releases
2. Unzip wherever you want
3. Open index.html with your webbrowser



Compile from source
-------------------

### Compile app

1. install Node.js with tsc (TypeScript) module
2. compile with 'tsc Main.ts --module AMD'


### Package app

1. Create a package: zip -r Webapp.Trackdesigner.zip Webapp.TrackDesigner/ -x "*.git" "*.git*" "*.odg" "*.ts" "*.~" "*.asta" "*/Test/*"
2. Create a minimal manifest
3. Deploy manifest + package to a marketplace


### Run app

Open index.html with your webbrowser.
