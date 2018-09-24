const BABEL_ENV = process.env.BABEL_ENV || ''
const isDev = BABEL_ENV.includes('dev')
const isModule = BABEL_ENV.includes('module')

module.exports = {
  presets: [
    [ '@babel/env', { forceAllTransforms: !isModule, targets: isModule ? { node: '8.8' } : {}, modules: isModule ? false : 'commonjs' } ]
  ],
  plugins: [
    !isModule && [ '@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true } ], // NOTE: for Edge(17.17134) support check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals
    [ 'module-resolver', { root: [ './' ], alias: isModule ? undefined : { 'dr-js/module/(.+)': 'dr-js/library/' } } ],
    [ 'minify-replace', { replacements: [ { identifierName: '__DEV__', replacement: { type: 'booleanLiteral', value: isDev } } ] } ]
  ].filter(Boolean),
  comments: false
}
