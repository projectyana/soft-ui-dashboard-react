/* eslint-disable */
import React, { useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

import { EDITOR_JS_TOOLS } from "./editor_tools";

const TextEditor = ({ action, formik }) => {
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
      <SuiButton
        mt={2}
        size="medium"
        color="info"
        onClick={() => handleSave()}>
        {action === "edit" ? "Save Update" : "Create"}
      </SuiButton>
    </SuiBox>
  );
};

export default TextEditor;