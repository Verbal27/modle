/**
 * https://github.com/yahoo/react-intl/blob/master/examples/nested/scripts/group-messages.js
 */
const fs = require('fs');
const path = require('path');
const { sync: globSync } = require('glob');
const { sync: mkdirpSync } = require('mkdirp');

// relative to project root
const MESSAGES_PATTERN = './build/messages/**/*.json';
const LANG_DIR = './src/lang';

// Groups the default messages by namespace that were extracted from the example
// app's React components via the React Intl Babel plugin. An error will be
// thrown if there are messages in the same namespace use the same `id`. The
// result is a collection of namespaced collections of `id: message` pairs for
// the app's default locale, "en-US".
const messages = globSync(MESSAGES_PATTERN)
  .map((filename) => JSON.parse(fs.readFileSync(filename, 'utf8')))
  .reduce((messages, descriptors) => {
    descriptors.forEach(({id, defaultMessage}) => {
      if (messages.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      messages[id] = defaultMessage;
    });
    return messages;
  }, {});

const filename = path.join(LANG_DIR, 'en-GB.json');
const data = JSON.stringify(messages, null, 2);

mkdirpSync(path.dirname(filename));
fs.writeFileSync(filename, data);
