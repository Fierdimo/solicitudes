import React from 'react'
import { Editor } from "primereact/editor";
export const ContentViewRequest = ({ value }, prompt) => {
  return (
    <>
      <Editor  {...prompt} value={value} readOnly headerTemplate={() => {
        return (
          <></>
        );
      }} style={{ height: '100%', border: "0" }} />
    </>
  )
}
