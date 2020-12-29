module.exports = {
  extends: 'noftalint',
  ignorePatterns: ['node_modules/', 'assets/'],
  rules: {
    // `node/file-extension-in-import` has too many false positives with .json.
    'node/file-extension-in-import': 'off',

    // We don't want to use babel for such a small project.
    'import/no-commonjs': 'off',

    // It is a CLI so it is much more convenient for us to use some synchronous APIs.
    'node/no-sync': 'off',
  },
};
