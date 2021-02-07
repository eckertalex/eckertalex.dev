import {useTheme} from 'next-themes'
import Highlight, {defaultProps} from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'

function getParams(className = '') {
  const data = className.split(':')

  const lang = data[0].replace('language-', '')
  const title = data[1]?.replace('title=', '')

  return [lang, title]
}

const hasSurroundingBracesRegex = /{([\d,-]+)}/

function calculateLinesToHighlight(meta) {
  if (!hasSurroundingBracesRegex.test(meta)) {
    return () => false
  }

  const lineNumbers = hasSurroundingBracesRegex
    .exec(meta)?.[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))

  return (lineNumber) =>
    lineNumbers?.some(([start, end]) => (end ? lineNumber >= start && lineNumber <= end : lineNumber === start))
}

export function Code(props) {
  const {theme} = useTheme()
  const {children: codeString, className: blockClassName, metastring = ''} = props
  const [language, title] = getParams(blockClassName)

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight
      {...defaultProps}
      theme={theme === 'dark' ? nightOwl : nightOwlLight}
      code={codeString}
      language={language}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <>
          {title && (
            <div className="px-3 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{title}</div>
          )}
          <div className="code-block" data-language={language}>
            <pre className={className} style={style}>
              {tokens.map((line, lineKey) => {
                const lineProps = getLineProps({line, key: lineKey, className: 'pl-2'})

                const isHighlighted = shouldHighlightLine(lineKey + 1)
                if (isHighlighted) {
                  lineProps.className = `${lineProps.className} -mx-3`
                  lineProps.style = {
                    ...lineProps.style,
                    backgroundColor: theme === 'dark' ? '#034072' : '#f1f1f1',
                  }
                }

                let lineNumberStyle = 'inline-block select-none opacity-25 text-right relative w-8 mr-4'
                lineNumberStyle = isHighlighted ? `${lineNumberStyle} ml-1` : `${lineNumberStyle} -ml-2`

                return (
                  // eslint-disable-next-line react/jsx-key
                  <div {...lineProps}>
                    <span className={lineNumberStyle}>{lineKey + 1}</span>
                    {line.map((token, tokenKey) => (
                      // eslint-disable-next-line react/jsx-key
                      <span {...getTokenProps({token, key: tokenKey})} />
                    ))}
                  </div>
                )
              })}
            </pre>
          </div>
        </>
      )}
    </Highlight>
  )
}
