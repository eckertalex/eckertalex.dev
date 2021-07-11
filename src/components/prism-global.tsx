import React from 'react'
import {css, Global} from '@emotion/react'

const prismStyles = css`
  .prism-code {
    border-radius: 0 !important;
  }

  .code-block {
    position: relative;
    overflow: auto;
  }

  .code-block pre[class*='language-'] {
    padding-top: 2rem;
  }

  .code-block pre[class*='language-']:before {
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

  .code-block pre[class~='language-js']:before {
    color: rgba(0, 0, 0, 1);
    content: 'js';
    background: #f7df1e;
  }

  .code-block pre[class~='language-jsx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'jsx';
    background: #61dafb;
  }

  .code-block pre[class~='language-ts']:before {
    color: rgba(0, 0, 0, 1);
    content: 'ts';
    background: #61dafb;
  }

  .code-block pre[class~='language-tsx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'tsx';
    background: #61dafb;
  }

  .code-block pre[class~='language-html']:before {
    color: rgba(255, 255, 255, 1);
    content: 'html';
    background: #005a9c;
  }

  .code-block pre[class~='language-xml']:before {
    color: rgba(255, 255, 255, 1);
    content: 'xml';
    background: #005a9c;
  }

  .code-block pre[class~='language-svg']:before {
    color: rgba(255, 255, 255, 1);
    content: 'svg';
    background: #005a9c;
  }

  .code-block pre[class~='language-graphql']:before {
    content: 'GraphQL';
    background: #e10098;
  }

  .code-block pre[class~='language-css']:before {
    color: rgba(0, 0, 0, 1);
    content: 'css';
    background: #ff9800;
  }

  .code-block pre[class~='language-mdx']:before {
    color: rgba(0, 0, 0, 1);
    content: 'mdx';
    background: #f9ac00;
  }

  .code-block pre[class~='language-php']:before {
    color: rgba(255, 255, 255, 1);
    content: 'php';
    background: #8892bf;
  }

  .code-block pre[class~='language-text']:before {
    content: 'text';
  }

  .code-block pre[class~='language-shell']:before {
    content: 'shell';
  }

  .code-block pre[class~='language-sh']:before {
    content: 'sh';
  }

  .code-block pre[class~='language-bash']:before {
    content: 'bash';
  }

  .code-block pre[class~='language-yaml']:before {
    content: 'yaml';
    background: #ffa8df;
  }

  .code-block pre[class~='language-yml']:before {
    content: 'yml';
    background: #ffa8df;
  }

  .code-block pre[class~='language-markdown']:before {
    content: 'md';
  }

  .code-block pre[class~='language-json']:before,
  .code-block pre[class~='language-json5']:before {
    content: 'json';
    background: 'linen';
  }
`

function PrismGlobal() {
  return <Global styles={prismStyles} />
}

export {PrismGlobal}
