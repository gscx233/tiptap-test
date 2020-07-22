<template>
  <div class="editor" @dragstart="enableEditing()" @dragend="disableEditing()">
    <editor-content class="editor__content" :editor="editor" />
    <editor-menu-bubble class="menububble" :editor="editor" v-slot="{ commands, isActive, menu }">
      <div
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button class="menububble__button" @click="addHeadnote()">New headnote</button>
        <button class="menububble__button" @click="commands.highlight">Highlight</button>
      </div>
    </editor-menu-bubble>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from "tiptap";
import { Highlight } from "../Highlight/Highlight";
import DragItem from "./DragItem";

export default {
  components: {
    EditorContent,
    EditorMenuBubble
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [new Highlight(), new DragItem()],
        editable: true,
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
        editable: true
      });
    },
    disableEditing() {
      this.editor.setOptions({
        editable: false
      });
    },
    addHeadnote() {
      var newHnNum = this.editor.schema.nodes.hn_num.create(null, null, null);
      var position = this.editor.selection.from;
      var transaction = this.editor.state.tr.insert(position, newHnNum);
      this.editor.dispatchTransaction(transaction);      
      this.editor.commands.highlight()
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
  position: relative;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(white, 0.3);
    }

    &.is-active {
      background-color: rgba(white, 0.3);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: white;
  }
}
</style>
