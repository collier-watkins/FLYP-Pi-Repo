# Pi micro site

## Dependencies

Check `package.json` for more specifications.

- React

- Electron

- Foreman

- electron-rebuild

- electron-packager

``` console
$ npm install --save-dev {dependencies}
```

## Packaging the Electron app

Use the script provided in `package.json` called `package-linux`. 
This will generate a packaged version of the app for armv7l for our Raspberry Pi. 

``` console
$ npm run package-linux
```

## Creating the debian installer

Use the script provided in `package.json` called `create-debain-installer`. 
This will generate a `.deb` file. 

``` console
$ npm run create-debian-installer
```

Transfer this `.deb` file onto the Raspberry Pi, use a USB drive to transfer the files. 
> You could use the `scp` command, however you will likely have to comment out the 
> last line in the Pi's `.bashrc` file. 
