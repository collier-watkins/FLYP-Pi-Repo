# Nodejs & Electron: setup notes

## Install node v8.x on Ubuntu & Debian:


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

## Create react app

Global command to create a micro site react app. 
Good to be integrated with a backend. 

``` console
$ sudo npm install -g create-react-app
```

## Electron react app

``` console
$ create-react-app my-app

# if you dont have electron yet
$ sudo npm install --save-dev electron
```

## Foreman

``` console
$ sudo npm install --save-dev foreman
```

## USB

``` console
$ sudo npm install --save-dev usb
```

## Electron Quick Start App (you wont need this) 

``` console
$ git clone https://github.com/electron/electron-quick-start

$ cd electron-quick-start

$ npm install

$ npm start
```
