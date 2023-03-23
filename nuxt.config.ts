// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.scss'],
  modules: [
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    'nuxt-lodash',
    '@nuxt/content',
  ],
  monacoEditor: {
    // These are default values:
    dest: '_monaco',
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  },
  hooks: {
    'vite:extendConfig': (config, {isClient, isServer}) => {
      if(isClient) {
        config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
      }
    }
  },

  nitro: {
    commonJS: {
      dynamicRequireTargets: [
        './node_modules/@vue/compiler-core',
        './node_modules/@vue/compiler-dom',
        './node_modules/@vue/compiler-ssr',
        './node_modules/vue/server-renderer',
        './node_modules/vue'
      ]
    },
  },

  alias: {
    '@vue/compiler-core': '@vue/compiler-core',
    '@vue/compiler-dom': '@vue/compiler-dom',
    '@vue/compiler-ssr': '@vue/compiler-ssr',
    'vue/server-renderer': 'vue/server-renderer',
    'estree-walker': 'estree-walker',
    '@babel/parser': '@babel/parser'
  },
})
