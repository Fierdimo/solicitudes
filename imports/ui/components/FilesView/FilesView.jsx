import React from 'react'
import { getFileLink } from '../../services/private/uploadFile.serivices';

import { DownloadOutlined } from '@ant-design/icons';


import "./index.css"

export const FilesView = ({ files }) => {
  return (
    <div className='Downloadlinks-FilesView'>
      {files.map(file => (
        <div key={file._id} title={file.name} className='DownloadLink-FilesView'>
          <a onClick={() => {
            getFileLink(file._id, "requests").then(fs => {
              let a = document.createElement("a");
              a.href = fs.link;
              a.click();
            })
          }
          } >{file.name} </a>

          <DownloadOutlined onClick={() => {
            getFileLink(file._id, "requests").then(fs => {
              let a = document.createElement("a");
              a.href = fs.link;
              a.download = file.name;
              a.click();
            })
          }
          } />
        </div>
      )
      )}
    </div>
  )
}
