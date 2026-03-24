---
title: A Neat Rounding Mode
pubDate: 2026-03-24
modTime: 2026-03-24
description: Today I learned about a new rounding mode, and I think it’s pretty great. It’s called half-even.
draft: false
---

Today I learned about a new rounding mode, and I think it’s pretty great. It’s called half-even. I was talking with some coworkers about a payout form and what we should use in the frontend. Specifically, how to format the preview amount. I was concerned about rounding mismatches between our frontend and backend systems. We are using the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) with style currency for this. Intl.NumberFormat lets you define a rounding mode, and by default it is half-expand. If you don’t know what half-even and half-expand mean, don’t feel bad I felt the same way. Thankfully the mdn docs are pretty good and have a comparison table.

However, I want to write about the reason I think half-even is great. My coworker told me that it is used in payroll because it is self balancing. Take a look at this example.

1.235 becomes 1.24 and 1.245 becomes 1.24.

This looks inconsistent, and it is by design. It is rounding towards the nearest even integer. That is why it is used in payroll because rounding differences balance out over time.

This is genius! I never even thought of a rounding mode like this. It seems to serve its purpose perfectly.
