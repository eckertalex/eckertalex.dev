---
title: Building My Own CLI App to Control Elgato Key Light Airs
pubDate: 2024-11-18
description: I’m building keylightctl, a custom CLI tool to control my Elgato Key Light Airs directly from the terminal. This tool already supports turning lights on and off and checking their status, with plans to add profiles, per-light controls, and dynamic brightness/temperature adjustments. Learn how I’m solving real workflow challenges while optimizing for simplicity and flexibility.
draft: false
---

As someone who loves optimizing workflows, I’ve been using a custom Bash script to control my Elgato Key Light Airs for the past few months. Since I spend most of my day in the terminal for work, running a quick `elgato on` command before a meeting is more convenient than using the official app. You can find the script [here in my dotfiles](https://github.com/eckertalex/dotfiles/blob/main/bin/.local/bin/elgato).

However, while the script works, it’s limited. The official app has its own issues, too—it often fails to find my lights, and my script faces the same problem. To improve reliability, I plan to add retry logic with backoff to my CLI so I don’t need to manually retry. Additionally, my script doesn’t support adjusting brightness or temperature. For now, I still rely on the official app for that, but it’s frustrating when it doesn’t connect.

If you’re interested, you can check out the progress of the tool on GitHub: [keylightctl](https://github.com/eckertalex/keylightctl).

---

## The Problem

1. **Unreliable Connections**: Both the official app and my script struggle to consistently find my lights.
2. **No Brightness/Temperature Adjustments**: My script can only toggle lights on or off; I have to use the app for finer controls.
3. **Contextual Lighting Needs**: I need different lighting settings based on the time of day, weather, or season. The official app doesn’t support saving profiles for these scenarios.
4. **Memory Overload**: I can’t always remember what settings worked well in the past, so I waste time manually tweaking them.

---

## The Solution: `keylightctl`

To address these challenges, I’ve started building my own CLI tool: `keylightctl`. It’s a work-in-progress, but it already outperforms both the official app and my script for the most basic use cases. Here’s what’s working so far:

- **Global Control**: A single command to turn all lights on or off.
- **Status Check**: A command to fetch the current state of the lights.

**Planned Features**:

- **Per-Light Controls**: Customize brightness and temperature for individual lights.
- **Profiles**: Save and apply predefined settings for different scenarios like "morning" or "winter."
- **Flags for Fine Control**:
  - `--brightness` and `--temperature` flags will allow fine-grained control of lighting.
  - These flags will work with `--light` but not with `--profile` and will override profile settings.
  - Available for the `on` command but not for the `off` command.
- **New `set` Command**: Adjust `--brightness` and `--temperature` without changing the light’s on/off state. The `set` command will also support the `--profile` flag.
- **Command-Line Autocompletion**: Simplify usage by suggesting light names and profiles as you type.
- **Retry Logic**: Add automatic retries with backoff for better reliability.

---

## Config-Driven Design

`keylightctl` is built around a simple **TOML configuration file** that defines each light, its IP address, and its profiles. Here’s an example:

```toml
default_template = "primary"

[[lights]]
name = "left"
ip = "192.168.2.164:9123"

[lights.configs.primary]
brightness = 70
temperature = 4000

[lights.configs.morning]
brightness = 80
temperature = 3500

[[lights]]
name = "right"
ip = "192.168.2.165:9123"

[lights.configs.primary]
brightness = 50
temperature = 3000

[lights.configs.morning]
brightness = 65
temperature = 3200
```

This allows for commands like:

```bash
keylight on
```

to use the default `primary` profile for all lights, or:

```bash
keylight on --light left --profile morning
```

to apply a specific profile to just one light. While this setup is planned, the ability to apply profiles and configure individual lights is not implemented yet.

---

## What I’ve Learned So Far

Working on `keylightctl` has been an incredibly satisfying experience. Here are my key takeaways:

1. **Configuration is Key**: A well-thought-out config file makes the tool powerful and easy to use.
2. **Small Touches Matter**: Features like autocompletion significantly improve the user experience.
3. **Solve Your Own Problems**: Building a tool tailored to your needs is both practical and rewarding.

---

## Next Steps

If you’re a developer looking for a fun, practical project, I highly recommend building a CLI tool. Not only is it a great learning opportunity, but it also results in something uniquely yours.

For now, I’ll keep improving `keylightctl` to better solve my lighting challenges—and perhaps help others with similar needs.
