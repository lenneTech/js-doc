<script lang="ts" setup>
import type * as monaco from 'monaco-editor';
// function runFunction() {
//   console.log('run');
// }
const componentKey = ref(0);

const options: monaco.editor.IEditorConstructionOptions & {theme: string} = {
  automaticLayout: true,
  theme: 'vs-dark',
};

const defaultTemplate = `<div>
    <LtSelectFunction :funcName="\'plus\'" :params="[1,2]" :expected="3"></LtSelectFunction>
    <!--This is some vue HTML <button class="btn btn-primary" @click="$emit(\'runFunction\')">Run Function</button>-->
</div>`;
const template = ref(defaultTemplate);

watch(template, () => {
  clearError();
  componentKey.value++;
});
</script>

<template>
  <div class="container m-auto auto-rows-auto grid grid-cols-2 gap-4">
    <div class="border-solid border-gray-500 rounded border p-2 h-full">
      <MonacoEditor v-model="template" :options="options" lang="html" class="h-full"/>
    </div>
    <div class="border-solid border-gray-500 rounded border p-2">
      <NuxtErrorBoundary>
        <RenderVueString :html="template" @runFunction="testFunction()" :key="componentKey"/>
        <template #error="{ error }">
          <div>{{error.message}}</div>
          Change content in Editor and <button class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="error.value = null">reset</button>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
