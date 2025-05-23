---
title: Know your tools
pubDate: 2024-11-07
description: A few weeks ago, I gave a lightning talk at an unconference during our team's onsite gathering. The following is an adapted version of my presentation on why we should all invest time in truly understanding our development tools.
draft: false
---

A few weeks ago, I gave a lightning talk at an unconference during our team's onsite gathering. The following is an adapted version of my presentation on why we should all invest time in truly understanding our development tools.

## The Tools We Use Every Day

As developers, we spend countless hours working with various tools: IDEs like IntelliJ and VSCode, design tools like Figma, our shell setups, and Git. And yes, some of us use Neovim (did I mention I use Neovim, btw?). But here's a question worth considering: How many of us have actually read the user manual for any of these tools we use daily?

## RTFM - Read The Friendly Manual

This might sound old-school, but there's immense value in actually reading the documentation of our tools. Before we jump into AI enhancements like GitHub Copilot or Cursor IDE, we should master our foundational development setup. The benefits compound over time, and you'll only get better returns as you deepen your understanding of your tools.

## Practical Tips and Tricks

Do you know the startup time of your shell? Try this command:

```bash
for i in $(seq 1 10); do time $SHELL -i -c exit; done
```

My shell starts up in more or less 100ms.

Did you ever struggle to change a word in a long command in the terminal? `<CTRL-e>` is supported by most shells and it will open your default editor with the command in the buffer. Once you save and exit the modified command is ready to go.

One of the most impactful ways to speed up your Git workflow is through aliases. Here are some useful Git aliases I recommend:

```bash
[alias]
s = status --short
aa = add --all
canf = commit --verbose --all --amend --no-edit
sw = switch
swm = "!git switch $(git-main-branch)"
pf = push --force-with-lease
plra = pull --rebase --autostash
```

You can make these even more accessible by creating shell aliases for your Git aliases:

```bash
for al in `git --list-cmds=alias`; do
    alias g$al="git $al"
done
```

This allows you to use commands like `gcanf` instead of `git canf`. This allows me to combine these aliases easily and create some sort of git "pipeline".

```bash
gsta && gswm && gplra && gsw - && gstp && pin
```

By chaining these git commands together I can stash all my uncommit changes, switch to my `main` branch, pull the latest changes, switch back to whatever branch I was on, pop the stash, and finally run pnpm install.

## Final Thoughts

The key takeaway isn't about any specific tool or trick – it's about the importance of investing time to truly understand and optimize the tools we use every day. Before diving into the latest AI-powered development tools, consider mastering the fundamentals first. The compound effect of knowing your tools inside and out will pay dividends throughout your career.

_This blog post is based on a lightning talk given at our team's unconference._

<a href="/know-your-tools.pdf" target="\_blank" rel="noopener noreferrer">Download the slides here</a>
