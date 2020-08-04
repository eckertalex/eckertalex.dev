/* eslint-disable react/jsx-key */
import React from 'react'
import Highlight, {defaultProps, Language} from 'prism-react-renderer'

import borealis from 'styles/borealis-prism'
/* -------------------------------------------------------------------------- */

type CodeProps = {
  children: string
  className: string
  metastring?: string
}

function getParams(className = '') {
  const data = className.split(':')

  const lang = data[0].replace('language-', '')
  const title = data[1]?.replace('title=', '')

  return [lang, title]
}

const hasSurroundingBracesRegex = /{([\d,-]+)}/

function calculateLinesToHighlight(meta: string) {
  if (!hasSurroundingBracesRegex.test(meta)) {
    return () => false
  }

  const lineNumbers = hasSurroundingBracesRegex
    .exec(meta)?.[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))

  return (lineNumber: number) =>
    lineNumbers?.some(([start, end]) => (end ? lineNumber >= start && lineNumber <= end : lineNumber === start))
}

export default function Code(props: CodeProps) {
  const {children: codeString, className: blockClassName, metastring = ''} = props
  const [language, title] = getParams(blockClassName)

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight {...defaultProps} theme={borealis} code={codeString} language={language as Language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div className="bg-pink-400 dark:bg-yellow rounded">
          {title && <div className="code-title">{title}</div>}
          <div className="code-block" data-language={language}>
            <pre className={className} style={style}>
              {tokens.map((line, lineKey) => {
                const lineProps = getLineProps({line, key: lineKey})

                if (shouldHighlightLine(lineKey + 1)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div {...lineProps}>
                    <span className="line-number-style">{lineKey + 1}</span>
                    {line.map((token, tokenKey) => (
                      <span {...getTokenProps({token, key: tokenKey})} />
                    ))}
                  </div>
                )
              })}
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  )
}
