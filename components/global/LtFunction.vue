<script lang="ts" setup>

// Get props
const props = withDefaults(defineProps<{

  // Erwartetes Resultat
  expected?: any,

  // Name of the file
  fileName?: string,

  // Function
  func: (...params: any[]) => any,

  // Name of the function
  funcName?: string,

  // Funcs declarations
  funcs?: Record<string, any>,

  // Line highlights
  highlights?: number[],

  // Code language
  language?: string,

  // Parameters to pass to the function (array to keep the order).
  params?: any[],

  // Theme
  theme?: string,
}>(), {params: () => []});

const emit = defineEmits(['update:funcName']);

// Refs
const {expected, fileName, func, funcName, highlights, language, params, theme} = toRefs(props);
const setFuncName = (e: Event) => {
  emit('update:funcName', (e.target as HTMLInputElement).value);
}
const expectedInput = ref<string>(JSON.stringify(expected.value));
const paramsInput = ref<string>(JSON.stringify(params.value));

// Computed
const status = computed(() => {
  return {
    'text-danger':
        expectedInput.value
        && !isEqual(func.value?.(...JSON.parse(paramsInput.value || '[]')), JSON.parse(expectedInput.value))
  };
});
const code = computed<string>(() => {
  let functionCode: string = func?.value ? func.value.toString().trim() : '';
  const name: string = funcName?.value?.split('.').pop() as string;
  if (!functionCode.startsWith('function') && !functionCode.startsWith(name)){
    functionCode = funcName?.value + functionCode;
  }
  return functionCode;
});
const result = computed<any>(() => {
  return func.value?.(...JSON.parse(paramsInput.value || '[]'));
});

</script>

<template>
  <div class="card mb-3" style="width: 600px">
    <div class="card-header">
      <h5 class="p-2" v-if="!funcs">{{ funcName }}</h5>
      <div class="p-2" v-else>
        Funktion:
        <select v-model="funcName" @change="setFuncName($event)" class="form-select" aria-label="Functions">
          <option v-for="option in Object.keys(funcs || {})" v-bind:value="option" >{{ option }}</option>
        </select>
      </div>
      <div class="d-flex flex-row">
        <div class="p-2">Parameter (Array): <input class="form-control" v-model="paramsInput"/></div>
        <div class="p-2">Erwarteter Wert: <input class="form-control" v-model="expectedInput"/></div>
      </div>
    </div>
    <div class="card-body">
      <LtCode :code="code" :highlights="highlights" :language="language" :theme="theme"></LtCode>
    </div>
    <div class="card-footer" v-if="expected !== undefined">
      <div class="text-green-600" :class="status">{{ result }}</div>
    </div>
  </div>
</template>
