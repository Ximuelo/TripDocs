module.exports = {
  content: ["./src/components/*.{tsx,ts}", "./src/screens/*.{tsx,ts}", "./src/components/*/*.{tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
