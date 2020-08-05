import {PrismTheme} from 'prism-react-renderer'
/* -------------------------------------------------------------------------- */

const theme: PrismTheme = {
  plain: {
    backgroundColor: '#194945',
    color: '#fff',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#02877b',
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation', 'namespace', 'property', 'variable'],
      style: {
        color: '#e1feff',
      },
    },
    {
      types: ['doctype', 'tag'],
      style: {
        color: '#9effff',
      },
    },
    {
      types: ['operator', 'keyword'],
      style: {
        color: '#ff9d00',
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: '#ff628c',
      },
    },
    {
      types: ['function', 'atrule-id', 'attr-name'],
      style: {
        color: '#ffde11',
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#FFD259',
      },
    },
    {
      types: ['string', 'attr-value', 'url'],
      style: {
        color: '#a5ff90',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#fb94ff',
      },
    },
    {
      types: ['constant'],
      style: {
        color: '#ff628c',
      },
    },
  ],
}

export default theme
