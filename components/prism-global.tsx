import {css, Global} from '@emotion/react'

const prismStyles = css`
  /**
 * MIT License
 * Copyright (c) 2018 Sarah Drasner
 * Sarah Drasner's[@sdras] Night Owl
 * Ported by Sara vieria [@SaraVieira]
 * Added by Souvik Mandal [@SimpleIndian]
 */

  .rehype-code-title {
    color: white;
    background-color: rgba(29, 59, 83, 0.99);
    font-weight: 600;
    padding: 0.5em;
    width: 100%;
    height: 100%;
  }

  pre {
    overflow-x: auto;
  }

  /**
 * Inspired by gatsby remark prism - https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .code-highlight.
 */
  .code-highlight {
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }

  .code-line {
    display: block;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -16px;
    margin-right: -16px;
    border-left-width: 4px;
    border-left-color: rgba(31, 41, 55, 0); /* Set code block color */
  }

  .code-line.inserted {
    background-color: rgba(16, 185, 129, 0.2); /* Set inserted line (+) color */
  }

  .code-line.deleted {
    background-color: rgba(239, 68, 68, 0.2); /* Set deleted line (-) color */
  }

  .highlight-line {
    margin-left: -16px;
    margin-right: -16px;
    background-color: rgba(55, 65, 81, 0.5); /* Set highlight bg color */
    border-left-width: 4px;
    border-left-color: rgb(
      59,
      130,
      246
    ); /* Set highlight accent border color */
  }

  .line-number::before {
    display: inline-block;
    width: 1rem;
    text-align: right;
    margin-right: 16px;
    margin-left: -8px;
    color: rgb(156, 163, 175); /* Line number color */
    content: attr(line);
  }

  code[class*='language-'],
  pre[class*='language-'] {
    margin-top: 0 !important;
    color: #d6deeb;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    font-size: 1em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  pre > code {
    background-color: unset !important;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: #011627;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.cdata {
    color: rgb(99, 119, 119);
    font-style: italic;
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .namespace {
    color: rgb(178, 204, 214);
  }

  .token.deleted {
    color: rgba(239, 83, 80, 0.56);
    font-style: italic;
  }

  .token.symbol,
  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: rgb(127, 219, 202);
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.constant,
  .token.function,
  .token.builtin,
  .token.char {
    color: rgb(130, 170, 255);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: italic;
  }

  .token.attr-name,
  .token.inserted {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.string,
  .token.url,
  .token.entity,
  .language-css .token.string,
  .style .token.string {
    color: rgb(173, 219, 103);
  }

  .token.class-name,
  .token.atrule,
  .token.attr-value {
    color: rgb(255, 203, 139);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  pre[class*='language-'] {
    position: relative;
    overflow: auto;
    padding-top: 2rem;
  }

  pre[class*='language-']:before {
    left: 1rem;
    background-color: rgba(255, 255, 255, 1);
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    color: rgba(0, 0, 0, 1);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    position: absolute;
    text-align: right;
    text-transform: uppercase;
    top: 0px;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  pre[class~='language-js']:before {
    color: rgba(0, 0, 0, 1);
    content: 'js';
    background: #f7df1e;
  }

  pre[class~='language-jsx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'jsx';
    background: #61dafb;
  }

  pre[class~='language-ts']:before {
    color: rgba(0, 0, 0, 1);
    content: 'ts';
    background: #61dafb;
  }

  pre[class~='language-tsx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'tsx';
    background: #61dafb;
  }

  pre[class~='language-html']:before {
    color: rgba(255, 255, 255, 1);
    content: 'html';
    background: #005a9c;
  }

  pre[class~='language-xml']:before {
    color: rgba(255, 255, 255, 1);
    content: 'xml';
    background: #005a9c;
  }

  pre[class~='language-svg']:before {
    color: rgba(255, 255, 255, 1);
    content: 'svg';
    background: #005a9c;
  }

  pre[class~='language-graphql']:before {
    content: 'GraphQL';
    background: #e10098;
  }

  pre[class~='language-css']:before {
    color: rgba(0, 0, 0, 1);
    content: 'css';
    background: #ff9800;
  }

  pre[class~='language-mdx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'mdx';
    background: #f9ac00;
  }

  pre[class~='language-php']:before {
    color: rgba(255, 255, 255, 1);
    content: 'php';
    background: #8892bf;
  }

  pre[class~='language-text']:before {
    content: 'text';
  }

  pre[class~='language-shell']:before {
    content: 'shell';
  }

  pre[class~='language-sh']:before {
    content: 'sh';
  }

  pre[class~='language-bash']:before {
    content: 'bash';
  }

  pre[class~='language-yaml']:before {
    content: 'yaml';
    background: #ffa8df;
  }

  pre[class~='language-yml']:before {
    content: 'yml';
    background: #ffa8df;
  }

  pre[class~='language-markdown']:before {
    content: 'md';
  }

  pre[class~='language-json']:before,
  pre[class~='language-json5']:before {
    content: 'json';
    background: 'linen';
  }
`

function PrismGlobal() {
  return <Global styles={prismStyles} />
}

export {PrismGlobal}
