import  { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Test = () => {
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  const handleConvert = () => {
    setHtmlContent(content);
  };

  useEffect(() => {
    console.log("content: ", content)

    return () => {
      
    }
  }, [content])
  

  return (
    <div className="p-4">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-4"
      />
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Convert and Copy to Clipboard
      </button>
      {
        content && (

      <CopyToClipboard text={content}>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Copy HTML to Clipboard
        </button>
      </CopyToClipboard>
        )
      }


      <div className="mt-4 p-4 border border-gray-300">
        <h2 className="text-lg font-bold mb-2">HTML Output:</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default Test;
