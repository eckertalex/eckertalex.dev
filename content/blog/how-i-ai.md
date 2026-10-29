---
{
    "title": "How I AI",
    "description": "My AI workflow is mostly a preference for simple tools, and why that keeps working while the tooling underneath it churns.",
    "published": "2026-08-20"
}
---

I don't have much of an AI setup. What I have is a preference for simple tools, applied to a much faster moving target than usual. Simple doesn't mean minimal to me, and it doesn't mean few moving parts. It means I understand every part of it, the outcome is predictable every time, and I can swap one piece without the rest caring. Some of what I run is genuinely complex by that measure. It's just not complicated, because none of it is a mystery to me.

When a workflow starts feeling complicated, that's still the signal I watch for. It usually means I haven't found the right way to do it yet, not that the problem demands the complexity. AI makes this worse, or at least faster: workflows built around this week's model or this month's tool expire quickly. A piece I actually understand survives that churn, because when something better comes along I can swap that one piece instead of tearing down a system built on last week's best practice.

I still stay informed and try things early. That's the only way to know whether something is useful or just hyped. But I look at everything I use with the same practical questions: what is this costing me, what happens when I stop using it, what am I getting for the complexity. Staying informed and staying invested are two different things, and mixing them up is how people end up stuck with tools for reasons that stopped applying a year ago. The other version of this is picking things up because everyone else is, without spending the time to understand it. Using a tool isn't the same as wielding it effectively.

Git worktrees are where I applied that filter directly. For a while I used persistent worktrees, one tmux session per worktree, following [matklad's setup](https://matklad.github.io/2024/07/25/git-worktrees.html). The worktrees broke on git's terms: Claude would lose track of which worktree it was in and edit across the boundary into a different one, and once a worktree had main checked out, I had no way to get back to a clean main anywhere else. Tmux broke on its own terms, separately: I didn't need the session persistence it gave me, my dev script already rebuilds the whole layout from scratch. What it did give me was unicode that still renders badly across terminals, a config I could never land on without it feeling brittle, and sessions that were slower to switch between than a terminal tab.

So I dropped worktrees for three full checkouts of the repo, and tmux for plain terminal tabs in a fixed order. A single script opens all of it: the same tabs, running the same thing, in the same order, every time I sit down after a few days away. None of this is minimal. It's a script driving a terminal, three clones of one repo, and settings kept in sync across all of them with a tool I've used for years. But it's predictable, and every piece of it is something I chose on purpose and could still explain.

My philosophy for AI is mostly the same as for any other tool: understand what you run, keep it predictable, and don't use anything you haven't taken the time to actually understand.
