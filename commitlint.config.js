module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 69], // github commit without being truncated
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'release', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci', 'build'],
    ],
  },
};
