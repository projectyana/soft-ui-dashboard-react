import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import BlogApi from "apis/Blog";

export const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
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
    }
  },
  linkTool: LinkTool
};