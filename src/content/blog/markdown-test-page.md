---
title: Markdown Test Page
pubDate: 2016-10-29
description: Sint sit cillum pariatur eiusmod nulla pariatur ipsum. Sit laborum anim qui mollit tempor pariatur nisi minim dolor. Aliquip et adipisicing sit sit fugiat commodo id sunt. Nostrud enim ad commodo incididunt cupidatat in ullamco ullamco Lorem cupidatat velit enim et Lorem. Ut laborum cillum laboris fugiat culpa sint irure do reprehenderit culpa occaecat. Exercitation esse mollit tempor magna aliqua in occaecat aliquip veniam reprehenderit nisi dolor in laboris dolore velit.
draft: true
---

## Headings

```md
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

### Result

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Sit amet justo donec enim diam. Massa enim nec dui nunc mattis enim ut tellus elementum. Lobortis mattis aliquam faucibus purus. Auctor eu augue ut lectus arcu bibendum at. Mus mauris vitae ultricies leo. Pellentesque habitant morbi tristique senectus et. Curabitur vitae nunc sed velit dignissim sodales ut. Tellus at urna condimentum mattis pellentesque id nibh. Morbi tristique senectus et netus et. Sed libero enim sed faucibus turpis. Sed nisi lacus sed viverra tellus in hac habitasse platea. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Molestie at elementum eu facilisis sed odio. A arcu cursus vitae congue mauris.

## Emphasis

```md
_This text will be italic_
_This will also be italic_

**This text will be bold**
**This will also be bold**

_You **can** combine them_
```

### Result

_This text will be italic_

_This will also be italic_

**This text will be bold**

**This will also be bold**

_You **can** combine them_

## Lists

### Unordered

```md
- Milk
- Bread
  - Wholegrain
- Butter
```

#### Result

- Milk
- Bread
  - Wholegrain
- Butter

### Ordered

```md
1. Tidy the kitchen
2. Prepare ingredients
3. Cook delicious things
```

#### Result

1. Tidy the kitchen
2. Prepare ingredients
3. Cook delicious things

## Images

```md
![Alt Text](url)
```

### Result

![eckertalex.dev](/og.png)

## Links

```md
[link](http://example.com)
```

### Result

[link](http://example.com)

## Blockquote

```md
> All We Have to Decide Is What to Do with the Time That Is Given to Us.
```

### Result

> All We Have to Decide Is What to Do with the Time That Is Given to Us.

## Horizontal Rules

```md
---
---
```

### Result

---

---

## Reference Lists & Titles

```md
**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"
```

### Result

**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"

## Escaping

```md
\*literally\*
```

### Result

\*literally\*

## Embedding HTML

```md
<p style="color: red;">Red Text</p>
```

### Result

<p style={{ color: "red" }}>Red Text</p>

## Strike-throughs

```md
~~deleted words~~
```

### Result

~~deleted words~~

## Automatic Links

```md
https://eckertalex.dev
```

### Result

https://eckertalex.dev

## Markdown Footnotes

```md
The quick brown fox[^1] jumped over the lazy dog[^2].

[^1]: Foxes are red

[^2]: Dogs are usually not red
```

### Result

The quick brown fox[^1] jumped over the lazy dog[^2].

[^1]: Foxes are red

[^2]: Dogs are usually not red

## Syntax Highlighting

````md
```js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: "#foo" });
  }
}
```
````

### Result

```js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: "#foo" });
  }
}
```

## Task Lists

```md
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
```

### Result

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

### Tables

You can create tables by assembling a list of words and dividing them with hyphens `-` (for the first row), and then separating each column with a pipe `|`:

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |
