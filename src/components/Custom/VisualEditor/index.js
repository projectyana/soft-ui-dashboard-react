/* eslint-disable */

import { useEffect } from "react";
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/grapes.min.js';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import { defaultHTML, defultStyle } from './defaultTemplate';

const VisualEditor = () => {
  let editor;

  const handleLog = () => {
    console.log(editor.getHtml());
    console.log(editor.getCss());
  };

  useEffect(() => {
    editor = grapesjs.init({
      container: '#gjs',
      height: '700px',
      width: '100%',
      plugins: ['gjs-preset-webpage'],
      // storageManager: {
      //   id: 'gjs-',
      //   type: 'local',
      //   autosave: true,
      //   storeComponents: true,
      //   storeStyles: true,
      //   storeHtml: true,
      //   storeCss: true,
      // },
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
      components: defaultHTML,
      style: defultStyle,
    });
  }, []);
  return (
    <>
      <div id="gjs"></div>
      <button onClick={() => handleLog()}></button>
    </>

  );

};

export default VisualEditor;