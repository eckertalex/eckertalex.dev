---
title: Connecting Raspberry Pi 3 with UAlaska
pubDate: 2017-10-17
description: Here is how to set up a connection with UAlaska on a RPi3.
draft: false
---

With the release of the
[Super Nintendo Classic Edition](https://www.nintendo.de/Diverses/Nintendo-Classic-Mini-Super-Nintendo-Entertainment-System/Nintendo-Classic-Mini-Super-Nintendo-Entertainment-System-1238330.html)
I decided to revive my **Raspberry Pi 3** running [Retropie][retropie] so that I
can enjoy the SNES games without spending more money. I needed to connect my
RPi3 to the internet to install a different UI design and scrape game art. I
started by following [Ryker Dial's instructions][eduroam_instructions] on how to
get my RPi3 connected to eduroam at UAF. Unfortunately, it did not work, and I
had to look for another solution.

Since a few weeks, UAF offers an improved version of the UAlaska network. The
process to set up a new connection was improved. With the new version, all you
have to do is type in your username and password. After digging around the
internet, I decided to give it a try. After digging around the internet, I
decided to give it a try. If it worked, it would also minimize the work in the
future, as it is unnecessary to download the needed root and user certificates.

Here is how to set up a connection with UAlaska on a RPi3. I tested it with
Retropie, but it should also work with Raspbian. Open the terminal (F8 in
Retropie) and type the following:

```sh
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Now add a new section:

```sh
network={
    ssid="UAlaska"
    scan_ssid=1
    key_mgmt=WPA-EAP
    eap=PEAP
    identity="<username>@alaska.edu"
    password="<password>"
    phase1="peaplable=0"
    phase2="auth=MSCHAPV2"
}
```

After this, you should be able to select UAlaska as your network and connect to
the internet.

[retropie]: https://retropie.org.uk/
[eduroam_instructions]: https://rainforestrobots.wordpress.com/2015/12/04/connecting-raspberry-pi-to-eduroam-at-uaf/
