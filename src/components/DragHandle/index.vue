<template>
  <div class="editor" @dragstart="enableEditing()" @dragend="disableEditing()">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { Heading, Code } from "tiptap-extensions";
import DragItem from "./DragItem";

export default {
  components: {
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [new Heading(), new Code(), new DragItem()],
        editable: false,
        content: `
          <h2>
            HN Number Drag Drop
          </h2>
          <p>
            In order to be able to edit them in the browser, it must be possible to represent document nodes in the browser DOM. The easiest way to do that is to include information about each node's DOM representation in the schema using the toDOM field in the node spec.
          </p>   
          <p>
          <span data-type="hn_num">HN1</span>Under South Carolina law, this action is governed by a three-year statute of limitation period. S.C. Code § 15-3-530(1) (Supp. 2012) (stating that the statute of limitations is three years for "an action upon a contract"); S.C. Code § 15-3-530(5) (stating that the statute of limitations is three years for "any injury to the person or rights of another, not arising on contract and not enumerated by law"); Graham v. Welch, Roberts & Amburn, LLP, 404 S.C. 235, 743 S.E.2d 860, 862 (S.C. Ct. App. 2013).</p>       
          <p>
          <span data-type="hn_num">HN2</span>After considering the facts of this case, and mindful of the South Carolina Supreme Court's instruction that equitable tolling should only be used "sparingly," the court declines to apply equitable tolling to suspend or extend the three—year statute of limitations.</p>       
        `
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    enableEditing() {
      this.editor.setOptions({
        editable: true,
      })
      console.log(this.editor);
    },
    disableEditing() {
      this.editor.setOptions({
        editable: false,
      })
      console.log(this.editor);
    }
  }
};
</script>

<style lang="scss">
[data-type="hn_num"] {
  padding: 0.3rem;
  background-color: rgba(black, 0.05);
  border-radius: 6px;
  color: #409eff;
  font-weight: bold;
  font-style: italic;
  cursor: move;
}

.editor {
  text-align: left;
  font-size: 16px;
}
</style>
