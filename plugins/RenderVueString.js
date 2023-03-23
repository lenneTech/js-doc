import { h, compile } from 'vue';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('RenderVueString', {
        props: ['html'],
        render() {
            try {
                return h(compile(this.html), {$emit: this.$emit});
            } catch(e) {
                return 'Error: ' + e;
            }

        }
    })
})
