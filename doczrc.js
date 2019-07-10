// doczrc.js
import { css } from 'docz-plugin-css'
import { postCSSPlugin } from 'docz-plugin-postcss';

export default {
  title: "MoodleNet styleguide",
  description: "A collection of primitives used across MoodleNet",
  plugins: [
    postCSSPlugin({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
  ]
}