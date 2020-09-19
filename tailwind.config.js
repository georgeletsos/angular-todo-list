const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = (isProd) => ({
  prefix: '',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts'],
  },
  theme: {
    fontFamily: {
      sans: ['Nunito', ...fontFamily.sans],
    },
    extend: {
      inset: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    borderColor: ({ after }) => after(['focus-within']),
    textColor: ({ after }) => after(['focus-within']),
  },
});
