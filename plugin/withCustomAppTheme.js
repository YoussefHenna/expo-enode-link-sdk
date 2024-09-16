const { withAndroidStyles } = require("expo/config-plugins");

function withCustomAppTheme(
  config,
  customAppTheme = "Theme.MaterialComponents.DayNight.NoActionBar",
) {
  return withAndroidStyles(config, (config) => {
    let modified = false;
    const styles = config.modResults;
    styles.resources.style.map((style) => {
      if (style.$.name === "AppTheme") {
        if (!modified) {
          style.$.parent = customAppTheme;
          modified = true;
        } else {
          styles.resources.style.splice(
            styles.resources.style.indexOf(style),
            1,
          );
        }
      }
    });
    return config;
  });
}

module.exports = withCustomAppTheme;
