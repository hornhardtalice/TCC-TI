module.exports = {
  defaultSeverity: 'error',
  plugins: [],
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.pcss'],
      customSyntax: 'postcss-scss',
      rules: {
        // Permite at-rules de bibliotecas como Tailwind
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
          }
        ]
      }
    }
  ]
};
