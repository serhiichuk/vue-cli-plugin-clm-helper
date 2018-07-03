# vue-cli-plugin-clm-helper

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**Status: beta** 

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
- [Plugin CLI Commands](#plugin-cli-commands)
  - [Generate](#generate)
  - [Dev](#dev)
  - [Build](#build)
- [Configuration](#configuration)
  - [Vue Config](#vue-config)
  - [CLM Config](#clm-config)
    - [clm](#clm)
      - [productId](#productid)
      - [disableSwipeBetweenFlows](#disableswipebetweenflows)
    - [languages](#languages)
    - [device](#device)
      - [resolution](#resolution)
    - [structure](#structure)
- [Additional Info](#additional-info)
  - [Slide Component](#slide-component)
  - [Basic Functionality](#basic-functionality)
    - [Global Functionality](#global-functionality)
      - [navigateTo](#navigateto)
    - [Slide Functionality](#slide-functionality)
      - [Text data](#text-data)
      - [Slide info data](#slide-info-data)
    - [App Functionality](#app-functionality)


## Getting started

:warning: Make sure you have [vue-cli 3.x.x](https://github.com/vuejs/vue-cli), [node 8.x.x](https://nodejs.org) and [yarn](https://yarnpkg.com).

[**Create**](https://cli.vuejs.org/guide/creating-a-project.html) new project and add plugin to your project, or add plugin to existing project. 

```
vue add clm-helper
```


**Fill in** [config](#clm-config) and [generate](#generate) the project [structure](#structure):

  *:information_source: File structure depend of `structure` key in `./src/clm.config.js`.*

```
yarn generate
```

**Start** your app:

```
yarn dev
```

## Directory Structure

### The App Directory

### The Assets Directory
	
### The Components Directory

### The Slides Directory

### The Style Directory


## Plugin CLI Commands
  
Plugin generator inject `generate`, `build` and `dev` commands to `package.json`. 

Plugin cli commands can run with fully-named `--clm veeva,mi-touch` or short-named `-c v,mt` syntax.

*:information_source: For using [standard vue build](https://cli.vuejs.org/guide/build-targets.html), just run `yarn build-standard`.*
  
#### Generate

Generating [slide-components](#slide-component) to `src/slides`, assets folders for each slide to `src/assets` and all text data files to `src/data`.
  
- **`yarn generate [lang]`**

  - `lang` - optional parameter, regular expression, must match one or more of `languages` key in `./src/cli.config.js`

*:information_source: For correct passing regular expressions from terminal, please wrap it in **double quotes**.*

```
yarn generate --lang "ua|ru" // will generated "ua" and "ru" templates
```

### Dev

Running development server.

Actually, duplicates command `yarn serve` to customary command `yarn dev` and *increase JavaScript heap of memory*. 

```
yarn dev
```

### Build

Build slides for necessary CLM's. Each slide will be built with webpack, have the necessary CLM files and be archived.


- **`yarn build <clm> [options] [filter] [lang]`**  

  - `clm` - required parameter, can be: `veeva`, `mi-touch` and `pharma-touch`
  - `options` - optional, can be: `no-screens` and `no-clear-assets`
  - `filter` - optional, regular expression for filtering around slide ID
  - `lang` - optional, regular expression for filtering around slide language

*Fully-named syntax:*

```
yarn build --clm mi-touch --options no-screens --filter "slide-1_1|slide-2_1" --lang ua
```

*Short-named syntax:*

```
yarn build -c mt -o ns -f "slide-1_1|slide-2_1 -l ua"
```

## Configuration

### Vue Config

Plugin generator create `vue.config.js` with necessary options.

See [official documentation](https://cli.vuejs.org/config/#vue-config-js) for full details.


### CLM Config

**All project depend of `src/clm.config.js`**

CLM platform options:

- #### clm

  - ##### productId

    `String`, must be named under rule: `<PROJECT-NAME>_<CYCLE>_<YEAR>`.

    During build to `productId` will added lang and slide id parts.

  - ##### disableSwipeBetweenFlows
  	
    `Boolean`, enable/disable auto preventing swipes between flows 
    
    *:information_source: At the moment, work only with MI Touch.*

    ```
    clm: {
      productId: 'SOME_PRODUCT_C2_18',
      disableSwipeBetweenFlows: true // enable auto preventing swipes between flows
    }
    ```

- #### languages

  To build different language versions just add necessary lang.

  *Valid values for cyrilic languages: `ua`, `ru`.*

  ```
    languages: ['ua', 'ru', 'kz']
  ```

- #### device

  - ##### resolution

    Device resolution will export to [shared styles](#vue-config).
    
    Also resolution using for [creating slide screenshots](./lib/screens-maker.js).
    
    ```
      device: {
        resolution: { // Pixels
          width: 2048,
          height: 1536
        }
      },
    ```

- #### structure
  Each slide must be specified in the `structure` with following keys: 
 
  Option | Type | Specify | Description
  --- | --- | --- | ---
  id | `String` | Required | Unique slide identifier, must be named under rule: `slide-<flow-number/name>_<slide-number>` 
  path | `String` | Required |  Path to slide. All [`slide-components`](#slide-component) must contain in `src/slides`, and you can create difference folders structure here.
  name | `String/Object` | Required |  Slide name. Required for [creating "slides.json" in Pharma Touch build](./commands/build-clm/build-pharma-touch.js), usualy using in `navigation-components`. **If `object` - keys names must match with [languages](#languages) items.**
  flowName | `String/Object` | Optional | Flow name, have the same rules as `name` key.
  swipe | `Object` | Optional | Define swipe rules. Can have `next` and `prev` keys.
  swipe.next, swipe.prev | `String` | Optional | Appropriate swipe will [navigate to](#navigateto) <slide-id> or prevented CLM swipe with 'prevent' value.  
  
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
       name: {ua: 'Назва', ru: 'Название'},
       flowName: {ua: 'Flow Назва', ru: 'Flow Название'},
       swipe: {
  	      next: 'slide-5_10',
          prev: 'prevent'
      }
    }
  ]
  ```

## Additional Info

### Slide Component

 Each `slide-component` have [global](#global-functionality) and [slide](#slide-functionality) functionality and must be named under rule: `slide-<flow-number/name>_<slide-number>`.

 All `slide-components` must contain in `src/slides`, and you can create difference folders structure here, just describe that in `clm.structure.js`.

### Basic Functionality

This plugin adds basic functions for CLM presentations and useful utilities for development.

Most of the basic functions defined in `src/app`.

#### Global Functionality

```
// main.js
import mixins from '@/app/mixins'
...
Vue.mixin(...mixins.global);
```

##### navigateTo

A global method that performs the function of navigating to the desired slide.

Takes *required* parameter `id`. 

Have different functional for each CLM system or development.

During development, `navigateTo` will check on existing parameter `id` in [structure](#structure).

*Using in template:*

```
<button class="some-navigation-button" @touchend="navigateTo('slide-1_4')"></button>
```

*Using in vue instance:*
```
methods: {
	someMethod() {
       ...
       this.navigateTo('slide-1_4')
   }
}
```

#### Slide Functionality
```
// each slide-component
import mixins from '@/app/mixins'
...
export default {
    mixins: [...mixins.slide],
}
```

##### Text data 

Each [`slide-component`](#slide-component) already has appropriate imported text data in `data` key.

The text data file must have the same path as slide-component, except for the name of the first folder (`data/` instead `slides/`).

**Also, for convenience, each slide-component have computed property `t`.**

*Some slide-component:*

```
mounted() {
    /* Text data for current slide, "content" and "popup" is required */
	console.log(this.data); 
    // => 
    { 
    	content: {
        	title: 'This is Awesome Documentations'
        },
        
        popup: {..} 
    }

    /* Easy way to get "data.content" */
    console.log(this.t); 
    // =>
    {
    	title: 'This is Awesome Documentations'
    }
}
```

*Using computed property `t` in template:*

```
<h1 class="awesome-title" v-html="t.title"></h1>
```

##### Slide info data

Each [`slide-component`](#slide-component) already has "personal info" in `slide` key. This is just an object from the current slide in the [structure](#structure).

*:information_source: In addition, `Text data`, and `Slide info data` will be passed to the `vuex store` as `currentData` and `currentSlide`.*

#### App Functionality

```
// App.vue
import mixins from '@/app/mixins'
...
export default {
  mixins: [...mixins.app]
}
```

In `App.vue` has functional for swipe control: `v-touch:swipe="swipeHandler"`.

`swipeHandler` will get [`disableSwipeBetweenFlows`](#disableswipebetweenflows), and [`swipe`](#structure) keys from `clm.config`, and depending on their values will call [`navigateTo`](#navigateto) or `prevent` necessary swipe.

