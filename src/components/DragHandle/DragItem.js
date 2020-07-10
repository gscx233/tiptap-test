import { Node } from 'tiptap'

export default class DragItem extends Node {

  get name() {
    return 'hn_num'
  }

  get schema() {
    return {
      group: 'inline',
      draggable: true,
      atom: true,
      inline: true,      
      content: 'text*',
      toDOM: () => ['span', { 'data-type': this.name }, 0],
      parseDOM: [{
        tag: `[data-type="${this.name}"]`,
      }],
    }
  }

  get view() {
    return {
      template: `
        <span data-type="hn_num" data-drag-handle contenteditable="false">
          <span data-drag-handle contenteditable="false">&#8942;&#8942;&nbsp;</span>      
          <span ref="content" data-drag-handle contenteditable="false"></span>              
        </span>
      `,
    }
  }
}
