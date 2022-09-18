import React from 'react';
import CreateMarkModal from './CreateMarkModal';
import MarksList from './MarksList';

function UploadMarks() {
  return (
    <>
      <MarksList />
      <div className="flex justify-end mt-2">
        <CreateMarkModal />
      </div>
    </>
  );
}

export default UploadMarks;
