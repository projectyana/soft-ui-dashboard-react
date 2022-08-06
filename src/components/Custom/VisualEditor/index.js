/* eslint-disable */

import { useEffect, useState } from "react";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/grapes.min.js';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import { defaultHTML, defaultStyle } from './defaultTemplate';

/**
 * @required formik props
 * @required action with value "create" or "edit"
 */

const VisualEditor = ({ action = "create", formik }) => {
  const [myEditor, setMyEditor] = useState(null);

  const { values, setValues, handleSubmit } = formik;

  const onClickSubmit = () => {
    const html = myEditor.getHtml();
    const css = myEditor.getCss();

    setValues({ ...values, html_content: html, css_content: css });

    handleSubmit();
  };

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '700px',
      width: '100%',
      plugins: ['gjs-preset-webpage'],
      storageManager: {
        id: 'gjs-',
        type: 'local',
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
      },
      storageManager: false,
      deviceManager: {
        devices:
          [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobilePortrait',
              name: 'Mobile portrait',
              width: '320px',
              widthMedia: '575px',
            },
          ]
      },
      pluginsOpts: {
        'grapesjs-preset-webpage': {
          blocksBasicOpts: {
            blocks: ['column1', 'column2', 'text', 'link', 'image', 'video'],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
      components: action === "edit" ? values?.html_content : defaultHTML,
      style: action === "edit" ? values?.css_content : defaultStyle,
    });

    setMyEditor(editor);
  }, []);

  return (
    <>
      <div id="gjs"></div>
      <SuiBox display="flex" justifyContent="flex-start" m={2}>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={() => onClickSubmit()}>
          {action === "edit" ? "Save Update" : "Create"}
        </SuiButton>
      </SuiBox>
    </>
  );
};

export default VisualEditor;