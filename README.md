# vue-cli-plugin-clm-helper

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**:rocket: Easy work with CLM presentations!**

This is a vue-cli 3.x plugin to help work with MI-Touch, Pharma Touch and Veeva systems.

**:star: Features:**

- Automatically generate file structure.
- Multi language
  - One slide-instance in development
  - Automatic import necessary text data
- Build for necessary CRM system
  - Using regular expressions for selectively build
  - Thumbs creating
  - Creating archives
- Development Page
  - QR-code for opening external link
  - Opportunity for display CRM system elements
- Project config
  - All structure depend of `structure` key in `./src/clm.config.js`
- Included basic CLM-methods
- All vue possibility

## Table of contents

- [Getting started](#getting-started)
- [Plugin Commands](#plugin-commands)
  - [Generate](#generate)
  - [Dev](#dev)
  - [Build](#build)
- [Configuration](#configuration)



## Getting started

:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

If you don't have a project created with vue-cli 3.x yet:

```
vue create my-new-clm-project -p serhiichuk/vue-preset-clm
```

Navigate to the newly created project folder and add the cli plugin:

```
cd my-new-clm-project
vue add clm-helper
```

Generate slide-components:

```
npm run generate
yarn generate
```
  *:information_source: File structure depend of `structure` key in `./src/clm.config.js`.*

Start your app:

```
npm run dev
yarn dev
```


- **`vue-cli-service build-clm`**

## Plugin CLI Commands
  
  Plugin generator inject `generate`, `build` and `dev` commands to `package.json`. 

  *:information_source: Plugin cli commands can run with fully-named `--clm veeva,mi-touch` or short-named `-c v,mt` syntax.*

  *:information_source: For using standard vue build just run `npm run/yarn` `build-standard`.*
  
#### Generate

- **`vue-cli-service generate [lang]`**

  Generate slide-components to `./src/slides`, assets slide dirs to `./src/assets`, all text data files to `./src/data`.
  
  - `lang` - optional parameter, regular expression, must match one or more of `languages` key in `./src/cli.config.js`

*:information_source: For correct passing regular expressions from terminal, please wrap it in double brackets.*

```
npm run generate -l ua
yarn generate --lang "ua|ru"
```

#### Dev

Duplicates command `npm run/yarn serve` to adjective command `npm run/yarn dev` 

```
npm run dev
yarn dev
```

#### Build

- **`vue-cli-service build-clm <clm> [options] [filter] [lang]`**

  Build slides to necessary CLM's.
  
  - `clm` - required parameter, can be: `veeva`, `mi-touch` and `pharma-touch`
  - `options` - optional, can be: `no-screens` and `no-clear-assets`
  - `filter` - optional, regular expression for filtering around slide ID
  - `lang` - optional, regular expression for filtering around slide language

*:information_source: You can use `filter` and `lang` options together.`*

```
npm run generate [lang]
yarn generate [lang]
```


## Configuration
