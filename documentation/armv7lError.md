```
pi@raspberrypi:~/Desktop/installers $ sudo apt install ./usite_0.1.0_armv7l.deb
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Note, selecting 'usite:armv7l' instead of './usite_0.1.0_armv7l.deb'
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 usite:armv7l : Depends: libgconf2-4:armv7l but it is not installable
                Depends: libgtk-3-0:armv7l but it is not installable
                Depends: libnotify4:armv7l but it is not installable
                Depends: libnss3:armv7l but it is not installable
                Depends: libxtst6:armv7l but it is not installable
                Recommends: pulseaudio:armv7l or
                            libasound2:armv7l but it is not installable
E: Unable to correct problems, you have held broken packages.

```