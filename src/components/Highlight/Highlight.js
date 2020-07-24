import {
    Mark
} from 'tiptap'
import {
    toggleMark,
    markInputRule,
    markPasteRule
} from 'tiptap-commands'

export class Highlight extends Mark {

    get name() {
        return 'highlight'
    }

    get schema() {
        return {
            attrs: {
                color: {
                    default: "rgba(240,87,100,0.7)"
                }
            },
            parseDOM: [{
                tag: "highlight"
            }],
            toDOM: mark => [
                "highlight",
                {
                    style: `background:${mark.attrs.color}`
                },
                0
            ]
        };
    }
    keys({
        type
    }) {
        return {
            'Mod-b': toggleMark(type),
        }
    }

    commands({
        type
    }) {
        return attrs => toggleMark(type, attrs);
    }

    inputRules({
        type
    }) {
        return [
            markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type),
        ]
    }

    pasteRules({
        type
    }) {
        return [
            markPasteRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/g, type),
        ]
    }

}