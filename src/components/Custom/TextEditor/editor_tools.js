/*eslint-disable*/

import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Embed from '@editorjs/embed';
import FontSize from "editorjs-inline-font-size-tool";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

import BlogApi from "apis/Blog";

export const EDITOR_JS_TOOLS = {
  fontSize: FontSize,
  embed: Embed,
  list: List,
  linkTool: LinkTool,
  header: {
    class: Header,
    tunes: ['alignmentTuneTool'],
    inlineToolbar: true
  },
  paragraph: {
    class: Paragraph,
    tunes: ['alignmentTuneTool'],
    inlineToolbar: true
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          const formData = new FormData();
          formData.append("image", file);

          return BlogApi.upload(formData)
            .then((res) => ({ success: 1, file: { url: `https://api.rokom.xyz/${res.data.data}` } }));
        }

      }
    },
  },
  alignmentTuneTool: {
    class: AlignmentTuneTool,
    config: {
      default: "left",
      blocks: {
        header: "left",
        paragraph: "left",
        list: "left"
      }
    }
  },
};