<script lang="ts" setup>
import { getHighlighter, renderToHtml } from 'shiki-es';
import { computedAsync } from '@vueuse/core';

// Get props
const props =  withDefaults(defineProps<{

      // Code
      code: string,

      // Line highlights
      highlights?: number[],

      // Code language
      language?: string,

      // Theme
      theme?: string,
    }>(),
    {
      funcSelect: false,
      funcDisabled: true, highlights: () => [],
      language: 'typescript',
      theme: 'github-light'
    }
);

// Inits
const {highlights, language, theme} = toRefs(props);
const highlighter = computedAsync(async () => {
  return await getHighlighter({
    theme: theme.value,
    themes: [theme.value],
    langs: [language.value as any],
  })
})

// Generate HTML
const code = computed(() => {
  if (!highlighter.value) {
    return '... rendering ...';
  }
  const tokens = highlighter.value.codeToThemedTokens(props.code, language.value ?? undefined);
  return renderToHtml(tokens, {
    fg: highlighter.value.getForegroundColor(theme.value),
    bg: highlighter.value.getBackgroundColor(theme.value),
    // custom element renderer
    elements: {
      pre({ className, style, children }: any) {
        return `<pre tabindex="1" class="${className}" style="${style}">${children}</pre>`
      },
      code({ children, className, style }) {
        return `<code class="${className}" style="${style}"><table>${children}</table></code>`
      },
      line({ className, index, children }: any) {
        const shallHighlight = highlights.value?.includes(index + 1) ?? false
        const lineNumber = `<td><span class="line-number" style="padding-right: 10px">${index + 1}</span></td>`;
        return `<tr class="${className} ${shallHighlight ? 'highlighted-line' : ''}">
    ${lineNumber}
    <td>${children}</td>
    </tr>`
      },
    },
  })
});
</script>

<template>
  <span v-html="code"></span>
</template>
