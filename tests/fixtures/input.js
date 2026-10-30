export default {
  addon: {
    components: {
      // A standalone component
      'top-level-component': {
        'index.hbs': '{{!-- top-level-component.hbs --}}',
        'index.js': '// top-level-component.js',
      },

      // A template-only component
      'template-only-component': {
        'index.hbs': '{{!-- template-only-component.hbs --}}',
      },

      'gjs-component': {
        'index.gjs': '// this is a gjs file'
      },

      // A nested component
      'parent-component': {
        'index.hbs': '{{!-- parent-component.hbs --}}',
        'index.js': '// parent-component.js',
        'child-component': {
          'index.hbs': '{{!-- parent-component/child-component.hbs --}}',
          'index.js': '// parent-component/child-component.js',
          'grandchild-component': {
            'index.hbs': '{{!-- parent-component/child-component/grandchild-component.hbs --}}',
            'index.js': '// parent-component/child-component/grandchild-component.js',
          },
        },
      },

      // Another nested component
      nested1: {
        'nested-component': {
          'index.hbs': '{{!-- nested1/nested-component.hbs --}}',
          'index.js': '// nested1/nested-component.js',
        },
        nested2: {
          'super-nested-component': {
            'index.hbs': '{{!-- nested1/nested2/super-nested-component.hbs --}}',
            'index.js': '// nested1/nested2/super-nested-component.js',
          },
        },
      },
    },
  },
};
