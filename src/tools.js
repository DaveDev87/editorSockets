import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Inlinecode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";


export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    header: Header,
    paragraph: Paragraph,
    image: SimpleImage,
    quote: Quote,
    list:List,
    code: Code,
    checklist: Checklist,
    inline: Inlinecode,
    marker: Marker,
    link: LinkTool,
    warning: Warning
  }