# Changelog

## [0.8.8] - 2017-08-15

### Added
- Docker file.
- Created npm start scipt.

### Updated.
- README.md and added instructions for `npm start` and `docker build`

## [0.8.5] - 2017-08-15

### Added
- EJS views in resources/views.
- Login functionality.
- Logout functionality.
- Dashboard functionality.
- Github Login via passportJS.
- Added some known paths in config.
- Less compiler, to generate css.
- listDir function in core.

### Refactors
- Test cases, and code to increase code coverage.

## [0.3.1] - 2017-08-15

### Added
- eslinter to validate code.
- Code coverate report.
- Application Secret keys, these are secrets used while hashing etc.
- Coverall.io bage in README.md

### Fixes
- fixed coding style errors.

## [0.2.6] - 2017-08-15

### Fixes
- Added links between changelog versions.

## [0.2.5] - 2017-08-14

### Added
- Koa framework.
- NodeJs crypto algo for hashing passwor.
- User API endpoints, GET/POST.
- Test cases for both endpoints.
- Test Facades, which are testsamples and some helper functions.

### Changed
- User Model to allow auto password hasing.

### Fixes
- User Table, added unique constraint on email address.

## 0.0.0 - 2017-08-14

### Added
- Integrated Mocha and Gulp for development work flow
- Added travis sticker in Readme
- Initialized node application

[0.8.5]: https://github.com/mabdullah353/koajsapp/compare/v0.3.1...v0.8.5
[0.3.1]: https://github.com/mabdullah353/koajsapp/compare/v0.2.6...v0.3.1
[0.2.6]: https://github.com/mabdullah353/koajsapp/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/mabdullah353/koajsapp/compare/v0.0.0...v0.2.5