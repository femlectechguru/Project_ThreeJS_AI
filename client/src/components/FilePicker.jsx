import React from 'react'

import CustomButton from './CustomButton'

/* const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  console.log('Selected File:', selectedFile); // Log the selected file object
  setFile(selectedFile);
} */

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'> 
      <div className='flex-1 flex flex-col'>
        <input
        id='file-upload'
        type='file'
        accept='image/*'
        onChange={(e) => {
          console.log('Selected File:', e.target.files[0]);
          setFile(e.target.files[0]);
        }}/>
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file=== '' ? "No file Selected" : file.name}
        </p>
      </div>
    <div className='mt-4 flex flex-wrap gap-3'>
      <CustomButton
      type='outline'
      title='Logo'
      handleClick={() => readFile('Logo')}
      customStyles='text-xs' />
       <CustomButton
      type='filled'
      title='Full'
      handleClick={() => readFile('full')}
      customStyles='text-xs' />
    </div>
    </div>
  )
}



export default FilePicker