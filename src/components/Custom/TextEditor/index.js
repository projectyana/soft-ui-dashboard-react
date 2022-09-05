/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import SuiBox from "components/SuiBox";
import { EDITOR_JS_TOOLS } from "./editor_tools";

const TextEditor = ({ formik }) => {
  const EditorJs = createReactEditorJS();
  const editorRef = useRef(null);

  const handleInitialize = React.useCallback((instance) => { editorRef.current = instance; }, []);

  const { values, setFieldValue, submitCount } = formik;

  async function handleSave() {
    const content = await editorRef.current.save();
    setFieldValue('content', JSON.stringify(content));
  }

  useEffect(() => {
    if (submitCount > 0) handleSave();

    return () => { };
  }, [submitCount]);

  return (
    <SuiBox xs={{ maxWidth: "650px" }} mb={3} bgColor="#ffffff" borderRadius="md" >
      <EditorJs
        holder="editorjs"
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        defaultValue={values.content ? JSON.parse(values.content) : null}
        onChange={() => handleSave()}
      />
    </SuiBox>
  );
};

export default TextEditor;