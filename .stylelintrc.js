module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'apply', 'tailwind', 'components', 'utilities', 'screen'],
      },
    ],
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'font-family-no-duplicate-names': null,
    'unit-allowed-list': ['px', 'deg', 'ms', '%', 'fr', 'vh', 'vw', 'em', 'rem', 's'],
  },
}
