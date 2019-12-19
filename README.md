# DOM Snapshot

[![i:npm]][l:npm]
[![i:ci]][l:ci]
[![i:size]][l:size]
[![i:npm-dev]][l:npm]

Get `<canvas>` from DOM string through SVG `<foreignObject>`.

[Online DEMO][l:demo]

[i:npm]: https://img.shields.io/npm/v/dom-snapshot?colorB=blue
[i:npm-dev]: https://img.shields.io/npm/v/dom-snapshot/dev
[l:npm]: https://npm.im/dom-snapshot
[i:ci]: https://img.shields.io/github/workflow/status/mockingbot/dom-snapshot/ci-test
[l:ci]: https://github.com/mockingbot/dom-snapshot/actions?query=workflow:ci-test
[i:size]: https://packagephobia.now.sh/badge?p=dom-snapshot
[l:size]: https://packagephobia.now.sh/result?p=dom-snapshot
[l:demo]: https://mockingbot.github.io/dom-snapshot

[//]: # (NON_PACKAGE_CONTENT)

- 📁 [source/](source/)
  - main source code, in output package will be:
    - `dom-snapshot/library`: for direct use, use `require() / exports.*=`, in ES5
    - `dom-snapshot/module`: for re-pack, keep `import / export` and readability
- 📁 [example/](example/)
  - some example (unsorted tests)
- 📄 [SPEC.md](SPEC.md)
  - list of all directly accessible codes, sort of an API lockfile
