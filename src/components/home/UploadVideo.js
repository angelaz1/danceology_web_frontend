import React, {useState} from 'react';
import { FormControl, Button } from '@mui/material';

import HomeDataService from '../../services/HomeService';

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (file == null) {
      return;
    }
    setSubmitDisabled(true);

    const formData = new FormData();
    formData.append('file', file);
    HomeDataService.submit(formData).then((res) => {
      setSubmitDisabled(false);
    });
  }

  function handleChange(event) {
    const files = Array.from(event.target.files);
    const [file] = files;

    setFile(file);
  }

  return (
    <div style={{ marginLeft: '15px', marginRight: '15px' }}>
      <h1 style={{ textAlign: 'left' }}>
        Upload Dance Video
      </h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormControl>
          <input type="file" id="file" name="file" accept="video/*" onChange={handleChange}/>
          <Button variant="contained" type="submit" disabled={submitDisabled} sx={{ mt: 2 }}>Submit</Button>
        </FormControl>
      </form>
    </div>
  );
}

export default UploadVideo;
