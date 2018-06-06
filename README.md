# vue-cli-plugin-clm-helper

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**:pray: Easy work with CLM presentations!**

This is a vue-cli 3.x plugin to help developing with MI Touch, Pharma Touch and Veeva CRM systems.

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
  - Included basic functionality
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
      - [productId](#productid)
    - [languages](#languages)
    - [device](#device)
      - [resolution](#resolution)
    - [structure](#structure)
- [Additional Info](#additional-info)
  - [Slide Component](#slide-component)
  - [Basic Functionality](#basic-functionality)
    - [Mixins](#mixins)
      - [Mixin Global](#mixin-global)
      - [Mixin Slide](#mixin-slide)


## Getting started

:warning: Make sure you have [vue-cli 3.x.x:](https://github.com/vuejs/vue-cli)

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

Generate [slide-components](#slide-component):

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

Generate [slide-components](#slide-component) to `./src/slides`, assets slide dirs to `./src/assets`, all text data files to `./src/data`.
  
- **`vue-cli-service generate [lang]`**

  - `lang` - optional parameter, regular expression, must match one or more of `languages` key in `./src/cli.config.js`

*:information_source: For correct passing regular expressions from terminal, please wrap it in **double quotes**.*

```
npm run generate -l "ua"
yarn generate --lang "ua|ru"
```

### Dev

Duplicates command `npm run/yarn serve` to customary command `npm run/yarn dev` 

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
npm run build --clm mi-touch --filter slide-1_1 --lang ua
yarn build -c v,mt,pt -o ns -f "slide-2_1|slide-main -l ru"
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
        // Do not include any files here which will have actual css output, 
        // otherwise our bundle file size will grow rapidly as the output will be in every file.
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

  - ##### productId

    In config `productId` must be named under rule: `[PROJECT-NAME]_[CYCLE]_[YEAR]`

    During build to `productId` will added lang and slide id parts.

    ```
    clm: {
      productId: 'SOME_PRODUCT_C2_18'
    }
    ```

- #### languages

  To build different language versions just add necessary lang.

  Valid values: `ua`, `ru`, `en`.

  ```
    languages: ['ua', 'ru']
  ```

- #### device

  - ##### resolution

    Device resolution will import in [shared styles](#vue-config).
    
    Also resolution using for [creating slide screenshots](./lib/screens-maker.js).
    
    ```
      device: {
        resolution: {
          width: 2048, // pixels
          height: 1536
        }
      },
    ```

- #### structure
  Each slide must be specified in the `structure` with following keys: `id`, `path`, `name`.
   
  Option | Type | Description
  --- | --- | ---
  id | `String` | Unique slide identifier, must be named under rule: `slide-[flow-num/name]_[slide-num]` 
  path | `String` | Path to slide. All [`slide-components`](#slide-component) must contain in `./src/slides`, and you can create difference folders structure here.
  name | `String/Object` | Slide name. Required for [creating 'slides.json' in Pharma Touch build](./commands/build-clm/build-pharma-touch.js), usualy using in `navigation-components`. **If `object` - keys names must match with [languages](#languages) items**  
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

## Additional Info

### Slide Component

 Each `slide-component` must be named under rule: 
 
 `slide-[flow-num|name]_[slide-num].vue`

 All `slide-components` must contain in `./src/slides`, and you can create difference folders structure here, just describe that in `clm.structure.js`

### Basic Functionality

#### Mixins

For using [Vue Mixins](https://vuejs.org/v2/guide/mixins.html) I **strongly** recommended use file `./src/app/mixins.js`.

There is [global](#mixin-global) and [slide](#mixin-slide) mixins.

```
// src/app/mixins.js
export default {
  /**
   * This object will added each vue instance
   * and, this keys will overwrite clm-instance keys in @/app/clm
   */
   global: {
      ...
   },
  
   /**
     * This object will added to each 'slide-component' instance
     * for adding this options to other components
     * just import mixin and include it => mixins: [mixins.slide]
     */
   slide: {
      ...
   }
}
```

##### Mixin Global

Each vue-component initially include `global` mixin which was created from merge `./src/app/clm` and `./src/app/mixins`.

```
// main.js
...
import clm from '@/app/clm'
import mixins from '@/app/mixins'
...
Vue.mixin({...clm, ...mixins.global});
```

`import clm from '@/app/clm'` return basic functionalities for necessary CLM *(set during build)*, or if `NODE_ENV === 'development'` return the same basic functionalities for development.

Basic functionalities:

- `navigateTo(id)` 
  
  Method for navigation around slides.
  
  Parameter `id`: id from one of slide in [structure](#structure). See also [productId](#productid)


##### Mixin Slide

Each [`slide-component`](#slide-component) initially include `slide` mixin from `./src/app/mixins`

```
// each slide-component
import mixins from '@/app/mixins'

export default {
  mixins: [mixins.slide],
  ...  
}
```

`mixins.slide` 
- determinate and set to vue instance current `slide.id`, `slide.path` 
- import necessary text data and set to vue instance current `data`
- has a computed property `t` for easy access to `data.content`

*:warning: `mixins.slide` does the above described things only in the [slide-component](#slide-component).*
