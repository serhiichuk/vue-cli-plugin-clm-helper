# vue-cli-plugin-clm-helper

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**Status: rc** 

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
  - Understanding excel structure
  - Restricted Workspace (for big projects)
- Project config

## Table of contents

- [Getting started](#getting-started)
- [Plugin CLI Commands](#plugin-cli-commands)
  - [Exсel](#excel)
  - [Generate](#generate)
  - [Dev](#dev)
  - [Build](#build)
- [Configuration](#configuration)
  - [Vue Config](#vue-config)
  - [Restricted Workspace](#restricted-workspace)
  - [CLM Config](#clm-config)
    - [clm](#clm)
      - [productId](#productid)
      - [productName](#productname)
      - [disableSwipeBetweenFlows](#disableswipebetweenflows)
      - [csv](#csv)
        - [country](#country)
        - [product](#product)
    - [languages](#languages)
    - [device](#device)
      - [resolution](#resolution)
    - [structure](#structure)
- [Additional Info](#additional-info)
  - [Slide Component](#slide-component)
  - [Basic Functionality](#basic-functionality)
    - [Global Functionality](#global-functionality)
      - [$navigateTo](#$navigateto)
      - [$addData](#$adddata)
      - [$openPdfIos](#$openpdfios)
    - [Slide Functionality](#slide-functionality)
      - [Text data](#text-data)
      - [Slide info data](#slide-info-data)
    - [App Functionality](#app-functionality)
- [Acknowledgments](#acknowledgments)   


## Getting started

:warning: Make sure you have [vue-cli 3.x.x](https://github.com/vuejs/vue-cli), [node 8.x.x](https://nodejs.org) and [yarn](https://yarnpkg.com).

1. **Create**
   
   [**Create with preset**](https://cli.vuejs.org/guide/plugins-and-presets.html#remote-presets): 
   
   ```
   vue create --preset serhiichuk/vue-preset-clm my-project
   ```
   
   Or [**create**](https://cli.vuejs.org/guide/creating-a-project.html) manually new project with following **features**: `router`, `vuex`, `babel`, `scss`, and add plugin to your project. 
   
   ```
   vue add clm-helper
   ```

2. **Complete the configuration file `clm.config.json`.**

    **Put Exсel File** with [valid structure](./commands/generate/default-templates/Structure_Example.xlsx) in root-folder, and [convert structure](#excel) from the excel file to `clm.config.json`, and fill in the remaining fields where you need it:
 
    ```
    yarn excel
    ```

    Or, **Fill the** [clm.config](#clm-config) file manually.
    
3.  **[Generate](#generate) the necessary files to the project [structure](#structure):**

    ```
    yarn generate
    ```

4. **Start your app:**

    ```
    yarn dev
    ```

## Plugin CLI Commands
  
Plugin generator inject `generate`, `build` and `dev` commands to `package.json`. 

Plugin CLI commands can run with fully-named `--clm veeva,mi-touch` or short-named `-c v,mt` syntax.

*:information_source: For using [standard vue build](https://cli.vuejs.org/guide/build-targets.html), just run `yarn build-standard`.*
  
  
### Excel

Convert [valid structure](./commands/generate/default-templates/Structure_Example.xlsx) from excel-file in root-folder to `clm.config.json`.  

- **`yarn excel`**

### Generate

Generating [slide-components](#slide-component) to `src/slides`, assets folders for each slide to `src/assets` and all text data files to `src/data` by scheme bellow:

```
+-- src
|   +-- assets
|   |   +-- images
|   |   |   +-- <sl.path> // empty folders for unique images for a slide
|   +-- data
|   |   +-- <lang>
|   |   |   +-- <sl.path>.js // templates for text
|   +-- slides
|   |   +-- <sl.path>.vue // all slide-componens
```

  
- **`yarn generate [lang]`**

  - `lang` - optional parameter, regular expression, must match one or more of `languages` key in `src/clm.config.json`

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

Build slides for necessary CLM"s. Each slide will be built with webpack, have the necessary CLM files and be archived.


- **`yarn build <clm> [options] [filter] [lang]`**  

  - `clm` - required parameter, can be: `veeva`, `mi-touch` and `pharma-touch`
  - `options` - optional, can be: `no-screens`, `no-clear-js` and `no-clear-assets`
  - `filter` - optional, regular expression for filtering around slide ID
  - `lang` - optional, regular expression for filtering around slide language

*Fully-named syntax:*

```
yarn build --clm mi-touch --options no-screens --filter "slide-1_1|slide-2_1" --lang ua
```

*Short-named syntax:*

```
yarn build -c mt -o ns -f "slide-1_1|slide-2_1" -l ua
```

## Configuration

### Vue Config

Plugin generator create `vue.config.js` with necessary options.

See [official documentation](https://cli.vuejs.org/config/#vue-config-js) for full details.

### Restricted Workspace

If you have a large project, you may have with the problem of too long compilation time.

So you can restrict your workspace by adding necessary filter to `VUE_APP_RESTRICTED_WORKSPACE_REGEX` in  `.env.development` file;

For example: 

```
VUE_APP_RESTRICTED_WORKSPACE_REGEX = slide-1_1$ // workking only with slide-1_1
```

### CLM Config

**All project depend of `src/clm.config.json`**

*:warning: All unique assets(public) for a particular slide must match the specified path in the `path` key for necessary `slide` in `structure` key in `clm.config`.*


CLM platform options:

- #### clm

  - ##### productId

    `String`, `Reauired`, must be named under rule: `<PROJECT-NAME>_<CYCLE>_<YEAR>`.

    During build to `productId` will added language and slide id parts.
  
  - ##### productName
    
    `String`, `Required`, Usually this is the same name as the root folder (only for Veeva and Pharma Touch)

  - ##### disableSwipeBetweenFlows
  	
    `Boolean`, `Optional`, enable/disable auto preventing swipes between flows 
    
    *:warning: At the moment, work only with MI Touch.*
  
  - ##### csv
    
    `Object`, `Optional`, contains information for creating a CSV file (only for Veeva)
  
    - ###### country
    
    `String`, default: "Ukraine" 
    
    - ###### product
        
    `String`, default: "INCH"
    

- #### languages

  `Array`, `Required`, to build different language versions just add necessary language.  

  *Valid values for cyrilic languages: `ua`, `ru`.*

  ```
    languages: ["ua", "ru", "fr"]
  ```

- #### device

  - ##### resolution

    `Object`, `Required`, device resolution will export to [shared styles](#vue-config).
    
    Also resolution using for [creating slide screenshots](./lib/screens-maker.js).
    
    ```
      "device": {
        "resolution": { // Pixels
          "width": "2048",
          "height": "1536"
        }
      },
    ```

- #### structure

  `Array`, `Required`, each slide must be specified in the `structure` with following keys: 
 
  Option | Type | Specify | Description
  --- | --- | --- | ---
  id | `String` | Required | Unique slide identifier, must be named under rule: `slide-<flow-number/name>_<slide-number>` 
  path | `String` | Required |  Path to slide. All [`slide-components`](#slide-component) must contain in `src/slides`, and you can create difference folders structure here.
  name | `String/Object` | Required |  Slide name. Required for [creating "slides.json" in Pharma Touch build](./commands/build-clm/build-pharma-touch.js), usualy using in `navigation-components`. **If `object` - keys names must match with [languages](#languages) items.**
  flowName | `String/Object` | Optional | Flow name, have the same rules as `name` key.
  swipe | `Object` | Optional | Define swipe rules. Can have `next` and `prev` keys.
  swipe.next, swipe.prev | `String` | Optional | Appropriate swipe will [navigate to](#$navigateto) <slide-id> or prevented CLM swipe with "prevent" value.  
  callDialog | `Array` | Optional | List of questions for call dialog definition. *(Only fo MI Touch).* 
  isHidden | `Boolean` | Optional | Set `true` to hide slide in menu list. *(Only fo MI Touch).*
  
  ```
  structure: [
    // required keys 
    {
      "id": "slide-main",
      "path": "slide-main",
      "name": {"ua": "Назва", "ru": "Название"}
    },
    ...
    {
      "id": "slide-1_3",
      "path": "flow-3/slide-1_3",
      "name": {"ua": "Назва", "ru": "Название"}
      "callDialog": "[
        "My Question 1", // this question will have automatic generated quiesion-id (Q1)
        {
          "id": "custon_id", // custom question id
          "question": "My Question 2"
        }
      ]
    },
    ...
    {
      "id": "slide-4_20",
      "path": "flow-4/slide-4_20",
      "name": "Назва", // the same name for all languages
      "swipe": {
  	    "next": "slide-5_10", // custon next swipe
        "prev": "prevent" // block back swipe
      },
      "isHidden": true // This slide not be displayed
    }
  ]
  ```

## Additional Info

### Slide Component

 Each `slide-component` have [global](#global-functionality) and [slide](#slide-functionality) functionality and must be named under rule: `slide-<flow-number/name>_<slide-number>`.

 All `slide-components` must contain in `src/slides`, and you can create difference folders structure here, just describe that in `clm.config.json`.

### Basic Functionality

This plugin adds basic functions for CLM presentations and useful utilities for development.

Most of the basic functions defined in `src/app-helper`.

#### Global Functionality

```
// main.js
import mixins from "@/app-helper/mixins"
...
Vue.mixin(mixins.global);
```

##### $navigateTo

A global method that performs the function of navigating to the desired slide.

Takes *required* parameter `id`. 

Have different functional for each CLM system or development.

During development, `$navigateTo` will check on existing parameter `id` in [structure](#structure).

*Using in template:*

```
<button class="some-navigation-button" @touchend="$navigateTo("slide-1_4")"></button>
```

*Using in vue instance:*
```
methods: {
  someNavigateMethod() {
    ...
    this.$navigateTo("slide-1_4")
  }
}
```

##### $addData

A global method that sends a calldialog response to the required clm database.

In development method `$addData` will check on existing [`callDialog`](#structure) key in [current slide](#slide-info-data).

*Using in vue instance:*
```
methods: {
  sendSomeData() {
    ...
    this.$addData("Q1", "Response for quiesion with automatic generated quiesion-id");
    this.$addData("custon_id", "Response for quiesion with custon id");
  }
}
```

##### $openPdfIos (only MI Touch)

A global method for opening PDF-files in on iOS devises.

*Using in vue instance:*
```
methods: {
  showPdf() {
    this.$openPdfIos("pdf/instructions.pdf");
  }
}
```

#### Slide Functionality
```
// each slide-component
import mixins from "@/app-helper/mixins"
...
export default {
  mixins: [ ...mixins.slide ],
}
```

##### Text data 

For import text data for current language just call: `getData` with relative (from **language** folder to file) path:

```
import getData from '@/data'

const myData = getData('/my-data.js')
``` 

```
+-- src
|   +-- data
|   |   +-- ua
|   |   |   +-- my-data.js
|   |   +-- ru
|   |   |   +-- my-data.js
```

Each [`slide-component`](#slide-component) already has appropriate imported text data in `data` key.

The text data file must have the same path as slide-component.

**Also, for convenience, each slide-component have computed property `t`.**

*Some slide-component:*

```
mounted() {
  /* Text data for current slide, "content" and "popup" is required */
	console.log(this.data); 
  // => 
  { 
  	content: {
      	title: "This is Awesome Documentations"
    },  
    popup: {...} 
  }

  /* Easy way to get "data.content" */
  console.log(this.t); 
  // =>
  {
  	title: "This is Awesome Documentations"
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
import mixins from "@/app-helper/mixins"
...
export default {
  mixins: [...mixins.app]
}
```

In `App.vue` has functional for swipe control: `v-touch:swipe="swipeHandler"`.

`swipeHandler` will get [`disableSwipeBetweenFlows`](#disableswipebetweenflows), and [`swipe`](#structure) keys from `clm.config`, and depending on their values will call [`$navigateTo`](#$navigateto) or `prevent` necessary swipe.

In addition, `App.vue` contains some development functionality, do not worry about it, all development functions will be deleted/disabled during the production build.

## Acknowledgments

Thank [Vue CLI Team](https://github.com/vuejs/vue-cli/graphs/contributors) for the excellent tool and documents.

Thank [vue-cli-plugin-apollo](https://github.com/Akryum/vue-cli-plugin-apollo/blob/master/README.md) and [Nuxt.org](https://nuxtjs.org/guide) for great documentation example.
