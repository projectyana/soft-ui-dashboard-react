/* eslint-disable */
import React, { useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

import { EDITOR_JS_TOOLS } from "./editor_tools";
import InputImage from "./InputImage";

const TextEditor = ({ action, formik, dataGambar, setDataGambar }) => {
  const EditorJs = createReactEditorJS();
  const editorRef = useRef(null);

  const { values, setValues, handleSubmit } = formik;

  async function handleSave() {
    const content = await editorRef.current.save();

    setValues({ ...values, content: JSON.stringify(content) });
    handleSubmit();
  }

  const handleInitialize = React.useCallback((instance) => { editorRef.current = instance; }, []);

  return (
    <SuiBox>
      <SuiBox mb={3} bgColor="#ffffff" borderRadius="md">
        <EditorJs
          holder="editorjs"
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
          defaultValue={values.content ? JSON.parse(values.content) : null}
        />
      </SuiBox>
      <SuiTypography variant="h6" >
        Blog Thumbnail
      </SuiTypography>
      <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />
      <SuiBox mt={2}>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={() => handleSave()}>
          {action === "edit" ? "Save Update" : "Create"}
        </SuiButton>
      </SuiBox>
    </SuiBox>
  );
};

export default TextEditor;