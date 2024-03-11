const withFonts = require('next-fonts');

module.exports = withFonts({
  compiler: {
    styledComponents: true,
  },
  webpack(config, options) {
    return config;
  },
});