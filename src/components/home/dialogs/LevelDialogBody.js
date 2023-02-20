import React from 'react';
import {
  TextField, Grid,
} from '@mui/material';

export default function LevelDialogBody(props) {
  const {name, setName, description, setDescription} = props;

  return (
    <Grid container spacing={3}>
        <Grid className="d-flex" item xs={12}>
            <TextField
                label="Level Name"
                variant="standard"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Grid>
        <Grid className="d-flex" item xs={12}>
            <TextField
                label="Description"
                variant="standard"
                required
                fullWidth
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </Grid>
    </Grid>
  );
}
