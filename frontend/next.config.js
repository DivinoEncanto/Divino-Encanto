module.exports = {
  eslint: {
    // Desativar ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  i18n: {
    // Configuração de internacionalização
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    localeDetection: false
  },
};
