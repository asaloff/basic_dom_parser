<template>
  <div class="wrapper">
    <h3>HTML</h3>
    <prism-editor class="my-editor" v-model="html" :highlight="htmlHighlighter" line-numbers></prism-editor>

    <button @click="parse" style="margin-top: 2rem">Parse HTML</button>

    <template v-if="output">
      <h3 style="margin-top: 2rem">Output</h3>
      <prism-editor class="my-editor" v-model="output" readonly :highlight="jsHighlighter"></prism-editor>
    </template>
  </div>
</template>

<script>
  // import Prism Editor
  import { PrismEditor } from 'vue-prism-editor';
  import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

  // import highlighting library (you can use any library you want just return html string)
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

  import { parseHTML, stringifiedTree } from '@/utils/parser'

export default {
  name: 'App',
  components: {
    PrismEditor
  },
  data: () => ({ 
    html: `<html>
    <head>
      <title>DOM Tutorial</title>
    </head>

    <body>
      <h1>DOM Lesson one</h1>
      <p>Hello world!</p>
      <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"/>
      <div>
        div text before
        <p>p text</p>
        <div>more div text</div>
        div text after
      </div>
    </body>
  </html>`,
    output: ''
  }),
  methods: {
    htmlHighlighter(code) {
      return highlight(code, languages.markup);
    },
    jsHighlighter(code) {
      return highlight(code, languages.js);
    },
    parse() {
      const parsed = parseHTML(this.html)
      this.output = stringifiedTree(parsed)
    }
  },
}
</script>

<style>
  .wrapper {
    padding: 20px;
  }

  .my-editor {
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
  .prism-editor__textarea:focus {
    outline: none;
  }

  .btn {
    margin-top: 10px;
  }
</style>
