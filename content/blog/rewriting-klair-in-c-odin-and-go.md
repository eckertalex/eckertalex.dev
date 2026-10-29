---
{
    "title": "rewriting klair in C, Odin and Go",
    "description": "How my Elgato Key Light tool went from a Bash script to a Go TUI to C, and why I'm writing it three more times.",
    "published": "2026-10-25"
}
---

I use my key light tool every day at work. I work in the terminal all day, and it's quick to toggle my lights on or off before and after a meeting. It started as a Bash script in my dotfiles, then became keylightctl, and now it's called [klair](https://github.com/eckertalex/klair). This post is about how it got here, and why I'm currently writing it three more times. It's a work in progress, the comparison will be a follow-up.

<aside class="pull-quote" aria-hidden="true"><p>This isn't a rewrite because the old version didn't work for me. I want to rewrite it mostly because it's a real tool I use, and I <em>want</em> to learn how to write platform layers and memory arenas in C.</p></aside>

## keylightctl, the original Go version

Back then I was learning Go, so I wrote it in Go. It was a CLI first, and I added a TUI on top because I wanted to learn about writing one. I later discovered I don't like one-off TUIs like that very much. At least for something this basic, it literally didn't help me. I kept using the CLI and never used the TUI at all.

What I did care about from the [original post](/blog/building-keylightctl/) was reliability: the official app and my script both struggled to find the lights, and I wanted retries with backoff. The planned profiles haven't made it into klair. On, off, and sometimes a brightness or temperature is what I use day to day, so they're a maybe for later.

## klair, the original C version

Then I discovered Handmade and wrote an initial version in C. I never bothered with a TUI, since I don't think it's a useful addition to this project. It's one file of about a thousand lines with no dependencies, and it talks to all lights at the same time: non-blocking sockets and a small state machine per light around one `poll()` call, so a light that's off the network doesn't hold up the others. Each light gets three attempts with a short backoff. It works, and it's the version I've been using every day since.

It's not cross platform, it relies heavily on POSIX sockets, and it doesn't have a platform layer or anything. But that's not really a problem.

It has fixed sizes: at most 16 lights, and names are capped at 63 characters. I think that was a good decision. Everything lives in fixed arrays on the stack, and klair itself never calls `malloc`. In general that's safer than the heap: there's nothing to free, so there are no leaks, no use after free and no double frees, and there's no out of memory case to handle. How much memory it needs is known before it runs. The config loader checks every line against those sizes and rejects what doesn't fit, instead of writing past the end of a buffer. And 16 lights and 63 characters for a name is plenty. I'm proud of that decision, but now I want to learn about memory arenas and remove these (very reasonable) restrictions.

## Why three more

This isn't a rewrite because the old version didn't work for me. I want to rewrite it mostly because it's a real tool I use, and I _want_ to learn how to write platform layers and memory arenas in C. A few months ago I picked up _Modern C_ by Jens Gustedt and learned a lot more about C itself and the C23 standard. But what I mostly want to put to use on something real is the Handmade Hero stuff.

The new C version is meant to be portable, support Windows, and have a proper Handmade style platform layer: a base layer with arenas and strings, the socket calls behind a small API, one backend per OS. I've also read a lot of the RAD Debugger code in the last weeks, and it's a huge inspiration for how those layers should look.

Does klair need a platform layer and Windows support? Not really. But I can learn how one would do this with a real project that I use, instead of a toy example. It's reinventing the wheel, and I think that's a good thing.

And then I thought, let's compare this with a Go version. I'm still more comfortable with Go than with C or Odin, and it should be quick to write. I've also been curious about Odin, and I felt the papercuts of C. So I wanted to see if Odin is a better fit for me.

So I decided to write klair in all three languages, each one fully featured like the original C version, and see how something like this ports to Odin and whether I like it better. The three versions also wait on the lights in three different ways. Go has a good standard library, so I use it: a goroutine per light, and the runtime does the waiting. Odin has `core:nbio`, an event loop that already uses whatever each platform does best under the hood. C doesn't give me that. Its standard library has no sockets at all, so I'd write the event loop myself, with one backend per OS (`io_uring` on Linux, `kqueue` on macOS and `IOCP` on Windows). And that's what I _want_ to implement, to learn how each of them works.

## One spec, one fake server

Before writing the three versions, I wrote a spec: every command, every flag, every error message, exit codes, the config format, what goes over the wire, timeouts, retries and the version string.

To test the implementations, I'm writing a fake lights server in Odin. Each fake light misbehaves in its own way: one drops the first connection, one answers a byte at a time, one answers garbage, one never answers at all. A script runs every implementation against it and compares the output with the spec. The server also checks every request it receives, so I can see that `klair on -b 50` really sent `{"lights":[{"on":1,"brightness":50}]}` and nothing else.

## No make

Every version has a `build.sh` instead of a Makefile. Each one is a unity build or a single package, so there's nothing to build incrementally. A shell script is more straightforward, it's one less dependency, and I don't have to deal with make's syntax. For me, make is the wrong tool for this job.

## Where I'm at

The spec is done, the three implementations and the fake server are in progress. In the end, I'll see if I can really love C, if Odin is the right middle point for me, or if Go is just good enough for me.
