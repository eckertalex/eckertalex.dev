---
title: Connecting Raspberry Pi 3 with UAlaska
date: '2017-10-17T17:06:00.000Z'
image: ''
categories: ['wifi']
tags: ['wifi', 'gaming']
---

With the release of the **Super Nintendo Classic Edition** I decided to revive my **Raspberry Pi 3** running [Retropie][retropie] so that I can enjoy the SNES games without spending more money.  
In order to install a different UI design and scrape game art, I had to connect my RPi3 to the internet. I started by following [Ryker Dial's instructions][eduroam_instructions] on how to get my RPi3 connected to eduroam at UAF. However, somehow it did not work for me and I had to look for another option.

Since a few weeks, UAF offers an improved version of the UAlaska network. Improved in the sense of setting up a connection. Witht the new version all you have to do is type in your username and password on a modern OS. After digging around the internet I decided to give it a try. If it worked, it would also minimize the work in the future as it is unnecessary to download the needed root and user certificates.

Here is how to set up a connection with UAlaska on a RPi3. I tested it with Retropie, but it should also work with Raspbian. Open the terminal (F8 in Retropie) and type the following:

{{< highlight bash "linenos=table" >}}
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
{{< / highlight >}}

Now add a new section:
{{< highlight bash "linenos=table" >}}
network={
ssid="UAlaska"
scan_ssid=1
key_mgmt=WPA-EAP
eap=PEAP
identity="username@alaska.edu"
password="password123"
phase1="peaplable=0"
phase2="auth=MSCHAPV2"
}
{{< / highlight >}}

After this you should be able to select UAlaska as your network and connect to the internet.

[retropie]: https://retropie.org.uk/
[eduroam_instructions]: https://rainforestrobots.wordpress.com/2015/12/04/connecting-raspberry-pi-to-eduroam-at-uaf/
