# Nodejs & Electron: setup notes

## Install Node JS v8.x on Ubuntu & Debian:


``` console
$ sudo apt update
$ sudo apt install curl
$ sudo apt install build-essential

# Install nodejs 8.x repo
$ curl -sL http://deb.nodesource.com/setup_8.x | sudo -E bash -

# Install nodejs and npm
$ apt install -y nodejs
```

https://www.metachris.com/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/nstall

## Install Node JS on Windows

https://nodejs.org/en/download/

Select the 64-bit `Windows Installer (.msi)` option. Install it.

In Visual Studio Code, open the built in terminal (or is it a built in windows command prompt?). 
Then change directory into the App's folder. This folder will contain `package.json`
> e.g. `$ cd awsusite` 

Then type `npm start` into the terminal to run the development build locally. 

## Create react app

Global command to create a micro site react app. Prepares basic React node_modules dependencies too. 
Good to be integrated with a backend. 

``` console
$ sudo npm install -g create-react-app
```

## Electron react app

``` console
$ create-react-app my-app

# if you dont have electron yet
$ npm install --save-dev electron
```

https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c

## Foreman

``` console
$ npm install --save-dev foreman
```

## node-hid

``` console
$ npm install --save-dev node-hid
```
