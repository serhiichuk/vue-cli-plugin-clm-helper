# vue-cli-plugin-clm-helper

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**:pray: Easy work with CLM presentations!**

This is a vue-cli 3.x plugin to help work with MI Touch, Pharma Touch and Veeva CRM systems.

**:star: Features:**

- Automatically generate file structure.
- Multi language
  - One slide-instance in development
  - Automatic import necessary text data
- Build for necessary CRM system
  - Using regular expressions for selectively build
  - Thumbs creating
  - Creating archives
- Development
  - QR-code for opening external link
  - Opportunity for display CRM system elements
  - Included basic CLM-methods
- Project config

## Table of contents

- [Getting started](#getting-started)
- [Plugin Commands](#plugin-commands)
  - [Generate](#generate)
  - [Dev](#dev)
  - [Build](#build)
- [Configuration](#configuration)
  - [Vue Config](#vue-config)
  - [CLM Config](#clm-config)
    - [clm](#clm)
      - [productId](#productId)
    - [languages](#languages)
    - [device](#device)
      - [resolution](#resolution)
    - [structure](#structure)



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

Plugin cli commands can run with fully-named `--clm veeva,mi-touch` or short-named `-c v,mt` syntax.

For using standard vue build just run `npm run/yarn` `build-standard`.
  
#### Generate

Generate slide-components to `./src/slides`, assets slide dirs to `./src/assets`, all text data files to `./src/data`.
  
- **`vue-cli-service generate [lang]`**
  - `lang` - optional parameter, regular expression, must match one or more of `languages` key in `./src/cli.config.js`

*:information_source: For correct passing regular expressions from terminal, please wrap it in double brackets.*

```
npm run generate -l "ua"
yarn generate --lang "ua|ru"
```

### Dev

Duplicates command `npm run/yarn serve` to adjective command `npm run/yarn dev` 

```
npm run dev
yarn dev
```

### Build

Build slides to necessary CLM's - each slide will build, have necessary CLM files and archived.

- **`vue-cli-service build-clm <clm> [options] [filter] [lang]`**  
  - `clm` - required parameter, can be: `veeva`, `mi-touch` and `pharma-touch`
  - `options` - optional, can be: `no-screens` and `no-clear-assets`
  - `filter` - optional, regular expression for filtering around slide ID
  - `lang` - optional, regular expression for filtering around slide language

```
npm run build -c v,mt -o ns -f "slide-2_1|slide-main"
yarn build --clm veeva --filter slide-1_1 --lang ua
```

*:information_source: You can use `filter` and `lang` options together.*

## Configuration

### Vue Config

Plugin generator create `vue.config.js` with necessary options:

See [official documentation](https://github.com/vuejs/vue-cli/blob/dev/docs/config.md) for full details.

```
module.exports = {
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
    	sass: {
        // Enable all sass-files in directory 'shared' to all sass styles
        // Do not include any files here which will have actual css output, otherwise our bundle file size will grow rapidly as the output will be in every file.
        data: require('./src/style/shared')
      }
    }
  },

  // Delete prefetch plugin because, slide don't use all chunks which webpack created
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
};
```

### CLM Config

**All project depend of `./src/clm.config.js`**

CLM platform options:

- #### clm

  Necessary CLM info.

  - ##### productId

    In config `productId` must be named under rule: `[PROJECT-NAME]_[CYCLE]_[YEAR]`

    During build `productId` will add `language` and `slide id` parts.

    ```
    clm: {
      productId: 'TEST_C2_18' // => [PROJECT-NAME]_[CYCLE]_[YEAR]
    }
    ```

- #### languages

  To build different language versions just add necessary lang.

  Valid values: `ua`, `ru`, `en`.

  ```
    languages: ['ua', 'ru']
  ```

- #### device
  Necessary Device info.

  - ##### resolution

    Device resolution will import in [shared styles](#vue-config).
    Also resolution using for [creating slide screenshots](./lib/screens-maker.js).
    
    ```
      device: {
        resolution: {
          width: 2048,
          height: 1536
        }
      },
    ```

- #### structure
  Each slide must be specified in the `structure` with following keys: `id`, `path`, `name`.
   
  Option | Type | Description
  --- | --- | ---
  id | `String` | Unique slide identifier, must be named under rule: `slide-[flow-num/name]_[slide-num]` 
  path | `String` | Path to slide. All `slide-components` must contain in `./src/slides`, and you can create difference folders structure here.
  name | `String/Object` | Slide name. Required for [creating 'slides.json' in Pharma Touch build](./blob/master/commands/build-clm/build-pharma-touch.js), usualy using in `navigation-components`. **If `object` - keys names must be equal to [languages](#languages)**  
  ```
  structure: [
    {
       id: 'slide-main',
       path: 'slides/slide-main',
       name: {ua: 'Назва', ru: 'Название'}
    },
    ...
    {
       id: 'slide-4_20',
       path: 'slides/slide-4_20',
       name: {ua: 'Назва', ru: 'Название'}
    }
  ]
  ```


