const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    localeDetection: true,
    localePath: path.resolve('./public/locales')
  },
  react: {
    useSuspense: false
  }
}
