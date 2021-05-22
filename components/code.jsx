import {Box, Text, useColorMode, useColorModeValue} from '@chakra-ui/react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'

function getParams(className = '') {
  const data = className.split(':'),
    lang = data[0].replace('language-', ''),
    title = data[1]?.replace('title=', '')

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
  const {colorMode} = useColorMode()
  const {children: codeString, className: blockClassName, metastring = ''} = props
  const [language, title] = getParams(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const titleColor = useColorModeValue('gray.700', 'gray.200')
  const titleBackgroundColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={colorMode === 'dark' ? nightOwl : nightOwlLight}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <Box marginTop={5}>
          {title ? (
            <Text color={titleColor} backgroundColor={titleBackgroundColor} paddingY={2} paddingX={3}>
              {title}
            </Text>
          ) : null}
          <div className="code-block" data-language={language}>
            <Box as="pre" display="inline-block" paddingRight={3} className={className} minWidth="full" style={style}>
              {tokens.map((line, lineKey) => {
                const lineProps = getLineProps({line, key: lineKey})
                const isHighlighted = shouldHighlightLine(lineKey + 1)

                return (
                  // eslint-disable-next-line react/jsx-key
                  <Box
                    {...lineProps}
                    paddingLeft={2}
                    marginX={isHighlighted ? -3 : undefined}
                    backgroundColor={isHighlighted ? (colorMode ? '#034072' : '#f1f1f1') : undefined}
                  >
                    <Box
                      as="span"
                      display="inline-block"
                      userSelect="none"
                      opacity={0.25}
                      textAlign="right"
                      position="relative"
                      width={8}
                      marginRight={4}
                      marginLeft={isHighlighted ? 1 : -2}
                    >
                      {lineKey + 1}
                    </Box>
                    {line.map((token, tokenKey) => (
                      // eslint-disable-next-line react/jsx-key
                      <span {...getTokenProps({token, key: tokenKey})} />
                    ))}
                  </Box>
                )
              })}
            </Box>
          </div>
        </Box>
      )}
    </Highlight>
  )
}
