<script type="text/jsx">
  export default {
    name: "json-to-dom",
    props: {
      json: {
        type: Object,
        required: true
      },
      bem: {
        type: Boolean,
        default: false
      },
      rootClassName: {
        type: String,
        default: undefined
      },
      rootTagName: {
        type: String,
        default: 'div'
      },
      inheritClassName: {
        type: Boolean,
        default: true
      }
    },

    created() {
      if (this.bem && !this.inheritClassName) {
        console.warn('[JsonToDom] Conflict props: For using BEM in prop "inheritClassName" value must be "true", you pass: ' + this.inheritClassName);
      }
    },

    /**
     * This function render DOM three from props data
     * DOM will rendered such as json structure
     * Each elements will have necessary classNames from json keys
     **/
    render(h) {
      const json = this.json;

      const getClassName = ({parentClassName, className, isElement}) => {
        const inheritClassName = this.inheritClassName;
        if (!inheritClassName) return className;


        const isBem = inheritClassName && this.bem;
        const isNumberedListItem = typeof className === 'number';
        const sep = isBem
          ? isElement ? '_' : '__'
          : '-';
        const prefixClassName = parentClassName
          ? parentClassName.split(' ')[0] + sep // get only first class name
          : '';

        return isNumberedListItem
          ? parentClassName && parentClassName + ' ' + parentClassName + sep + (className + 1)
          : prefixClassName + className

      };

      const jsToDOM = ({data, className, parentClassName}) => {
        const isString = typeof data === 'string' || typeof data === 'number';
        const isArray = Array.isArray(data);
        const isObject = typeof data === 'object' && !isArray;
        let newClassName;

        /**
         *  return div single element
         */
        if (isString) {
          newClassName = getClassName({
            parentClassName,
            className,
            isElement: true
          });

          return <div class={newClassName} domPropsInnerHTML={data}/>
        }

        /**
         * call jsToDOM() for each element in array/object recursive
         */
        newClassName = getClassName({parentClassName, className});

        if (isArray) {
          return <div class={newClassName}>
            {data.map((item, index) => jsToDOM({
                data: item,
                parentClassName: getClassName({parentClassName, className}),
                className: index
              })
            )}
          </div>;
        }

        if (isObject) {
          return <div class={newClassName}>
            {Object.keys(data).map(key => jsToDOM({
                data: data[key],
                parentClassName: getClassName({parentClassName, className}),
                className: key
              })
            )}
          </div>
        }
      };


      /**
       * Create root element and call jsToDOM() for each json element
       */
      const root = {
        tag: this.rootTagName,
        class: this.rootClassName
      };

      return h(root.tag,
        {class: root.class},
        Object.keys(json).map(item => jsToDOM({
          data: json[item],
          className: item,
          parentClassName: root.class
        })));
    }

  };
</script>
