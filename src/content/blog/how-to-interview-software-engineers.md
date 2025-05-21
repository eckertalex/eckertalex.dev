---
title: How to Interview Software Engineers
pubDate: 2025-05-25
modTime: 2025-05-25
description: Soon I'll be leading my first software engineering interviews at work. While I've been on the candidate side many times, I realized how unprepared I am to be an effective interviewer. To my surprise, I found very little practical advice—so I've gathered this collection of the most helpful advice I could find.
draft: false
---

Soon I'll be leading my first software engineering interviews at work. While I've been on the candidate side many times, I realized how unprepared I am to be an effective interviewer. To my surprise, I found very little practical advice—so I've gathered this collection of the most helpful advice I could find.

My employer requires all interviewers to complete an online training course covering legal boundaries—what you can and can't ask—as well as bias and stereotyping. None of it was entirely new to me, but it was a useful reminder to be mindful of the biases we all have. I don't plan to go into the legal side of interviewing here, but it's important to treat every candidate fairly and respectfully—giving them a real chance to show they can do the job.

Before I can lead interviews myself, I also need to shadow three interviews led by co-workers. I'm hoping to learn a lot from them, but I wanted to have some foundational knowledge beforehand—so I've searched for blog posts by experienced engineers.

Most of what I found was aimed at candidates rather than interviewers. And the few posts written for interviewers were too generic and superficial—often published on company blogs and light on specifics. I am not looking for a list of go-to questions or a template to copy. I want practical insights from people who had done a lot of interviews and taken the time to reflect on what works and what doesn't. I know there is no shortcut to experience, but I'm sure there are lessons that I can learn that will make a difference.

## The Best Advice I Found

I found one post from my former manager at Personio that really stood out: [Being a Great Interviewer](https://uhl-steine-scherben.org/blog/posts/being_a_great_interviewer/). It's thoughtful, concrete, and clearly written by someone who has spent time reflecting on what makes interviews effective. It's the kind of advice I wish there were more of.

I especially liked the section about the mindset I should have going into the interview. Here is a quote that summarizes it quite well.

> I found the best way to go about interviews is to have the mindset of I want to see your very best.

The interview itself breaks down into three sections: Intro, Main, and Questions.

The introduction is the interviewer's opportunity to set the tone of the interview. Keep it relaxed, don't take yourself too seriously, and appear humble. Outline the session structure upfront—what topics will be covered and how time will be allocated—significantly reduces candidate anxiety.

For the main part of the interview, active moderation is essential. Don't hesitate to redirect candidates who stray off-topic—it's actually more respectful than letting them undermine their chances. Even when it becomes clear a candidate may not be selected, completing the full interview maintains their dignity and protects your company's reputation.

The last 25% of the interview should be reserved for any questions the candidate might have. The questions the candidate asks can reveal as much as their answers to your questions.

What resonated most with me was the reminder that interviews are two-way evaluations. Great candidates have options, so we need to sell our workplace as much as they need to showcase their skills.

## Practical Interview Techniques

I also reached out to my mentor for advice, and one thing that really stood out was his unique note-taking system for interviews. He organizes information by using different formats to clearly separate types of content: plain text for the candidate's responses, parentheses `()` for his own questions or remarks, and angled brackets `<>` to capture his immediate impressions during the conversation. Here's an example of how it looks in action:

```
- Explained building reusable React components using hooks and context API
- (How do you manage global state without Redux?) Uses Context with useReducer for complex state <Good grasp of React internals, confident answer>
- Described optimizing rendering performance by memoizing components with React.memo and useCallback <Shows awareness of common React pitfalls>
- Didn't mention handling accessibility or semantic HTML in React apps <Missed important frontend best practices>
```

I really like this system as it gives a space to put in-the-moment thoughts. Those thoughts might be different after the interview, this keeps these temporary feelings persisted to reference back later when the feelings are gone.

Another co-worker shared with me his notation system. He uses a straightforward plus/minus system that helps him quickly assess responses. It's intuitive: plus signs `+` for strong answers and minus signs `-` for weak responses. Here's a simplified example:

```
+ Explained building reusable React components using hooks and context API
+ Uses Context with useReducer for complex state
+ Described optimizing rendering performance by memoizing components with React.memo and useCallback
- Didn't mention handling accessibility or semantic HTML in React apps
```

What I like about this system is its simplicity. It creates an instant visual map of a candidate's strengths and weaknesses. This one seems a little easier for me to get started with, so I will likely try this one out, but in the end I will have to find my own notation system. And who knows, it could be a mix of the two.

## Making the Final Decision

Another piece of advice came from the same coworker. He told me to leave every interview with clear answers to two questions:

1. Would you like to work with the candidate?
2. Are you able to defend your evaluation of the candidate?

These are deceptively simple but surprisingly clarifying. The first question brings focus and reminds me that, ultimately, I might work alongside this person. However, it can be a tricky one—it's important to keep stereotypes and biases in check. This question is about the big picture: Does the candidate possess the necessary experience, knowledge, and communication skills to be a valuable asset? The second question holds me accountable to make an informed, fair, and well-supported recommendation—one that can confidently withstand discussion or disagreement.

When in doubt, err on the side of "no hire." Bringing in someone who isn't a good fit causes far more issues than missing out on a potentially great candidate. That said, this decision not be made casually—it's only fair if the interview was conducted thoughtfully and with respect.

I'm starting to feel a bit more comfortable taking on my first interviews. While I'm still worried about getting it right for the candidate, I'm committed to doing my best and learning as I go. I hope that with more shadowing, I'll gain more confidence in my approach. Hopefully, this post serves as a helpful starting point for others in a similar position.
