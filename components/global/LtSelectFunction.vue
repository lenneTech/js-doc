<script lang="ts" setup>
import {Calculator} from '../../classes/calculator.class';

function plus(a: number, b: number, c:number) {
  return a + b + c;
}

// Functions
const funcs: Record<string, any> = {
  'Calculator.multiple': {
    func: Calculator.multiple,
    params: [-4, 7],
    expected: -28
  },
  plus: {
    func: plus,
    params: [2, 3, 4],
    expected: 9
  },
  minus: {
    func: (a: number, b: number) => {
      return a - b;
    },
    params: [3, 2],
    expected: 1
  }
};

// Get props
const props = withDefaults(defineProps<{

  // Erwartetes Resultat
  expected?: any,

  // Name of the file
  fileName?: string,

  // Name of the function
  funcName: string,

  // Change function lock
  funcDisabled?: boolean,

  // Line highlights
  highlights?: number[],

  // Code language
  language?: string,

  // Parameters to pass to the function (array to keep the order).
  params?: any[],

  // Theme
  theme?: string,
}>(),
    { funcDisabled: true }
);

// Inputs
const {fileName, funcDisabled, highlights, language, theme} = toRefs(props);

// Inputs with inner changes
const funcName = ref(props.funcName);
watch(() => props.funcName, (current) => {
  funcName.value = current;
});

// Computed
const expected = computed(() => props.expected ? props.expected : funcs[funcName.value].expected)
const func = computed(() => funcs[funcName.value].func);
const params = computed(() => props.params ? props.params : funcs[funcName.value].expected);
</script>

<template>
  <LtFunction
      :expected="expected"
      :fileName="fileName"
      :func="func"
      v-model:funcName="funcName"
      :funcs="!funcDisabled ? funcs : undefined"
      :highlights="highlights"
      :language="language"
      :params="params"
      :theme="theme"
  ></LtFunction>
</template>
