# Pi micro site

### Setup 

``` console
$ npm install
```

For info on remote connection to Raspberry Pi [click here](documentation/piConnection.md)

### Packaging the Electron app

Use the script provided in `package.json` called `package-linux`. 
This will generate a packaged version of the app for armv7l for our Raspberry Pi. 

``` console
$ npm run package-linux
```
For more details on electron or Node.js setup [click here](documentation/electronSetup.md)

### Creating the debian installer

Use the script provided in `package.json` called `create-debain-installer`. 
This will generate a `.deb` file. 

``` console
$ npm run create-debian-installer
```

### Dependencies

Check `package.json` for more specifications.

- React
- Electron
- Foreman
- electron-rebuild
- electron-packager

Transfer this `.deb` file onto the Raspberry Pi, use a USB drive to transfer the files. 
> You could use the `scp` command, however you will likely have to comment out the 
> last line in the Pi's `.bashrc` file. 


Repository for the webapp and API can be found [here](https://github.com/CurtisGreen/FLYP-EC2-Repo)
