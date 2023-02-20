import React, { useState, useEffect } from 'react';
import { 
  IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

import {
  Edit, Delete
} from '@mui/icons-material';

import EditDialog from '../common/EditDialog';
import DeleteDialog from '../common/DeleteDialog';

import HomeDataService from '../../services/HomeService';
import LevelDialogBody from './dialogs/LevelDialogBody';

const columns = [
  { headerName: 'ID', width: 70 },
  { headerName: 'Name', width: 130 },
  { headerName: 'Description', width: 350 },
  { headerName: 'Pose Data', width: 130 },
  { headerName: '', width: 130 },
];

function createData(id, name, description, poseData) {
  return {id, name, description, poseData};
}

export default function LevelsList() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    UpdateLevelRows();
  }, []);

  function UpdateLevelRows() {
    HomeDataService.getAllLevels().then((res) => {
      let levels = res.data.levels;
      const newRows = [];

      levels.forEach((level) => {
        newRows.push(createData(
          level.id,
          level.name,
          level.description,
          level.poseData ? "Exists" : "DNE"
        ));
      });
      setRows(newRows);
    });
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openEditDialog = (row) => {
    setOpenEdit(true);
    setSelectedRow(row);

    setName(row.name);
    setDescription(row.description);
  };

  const openDeleteDialog = (row) => {
    setOpenDelete(true);
    setSelectedRow(row);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    HomeDataService.editLevel(
      selectedRow.id, 
      { name: name, description: description }
    ).then(() => UpdateLevelRows());

    handleClose();
  };

  const handleDelete = () => {
    HomeDataService.deleteLevel(
      selectedRow.id
    ).then(() => UpdateLevelRows());

    handleClose();
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };

  return (
    <div style={{ marginLeft: '15px', marginRight: '15px' }}>
      <h1 style={{ textAlign: 'left' }}>
        Levels
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{width: column.width}}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.poseData}</TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{mr: {xs: 1, sm: 2, lg: 3}, ml: {xs: 1, sm: 2}, my: 1.5}}
                  >
                    <IconButton sx={{mr: 1}} color="info" onClick={() => openEditDialog(row)}>
                      <Edit />
                    </IconButton>

                    <IconButton color="error" onClick={() => openDeleteDialog(row)}>
                      <Delete />
                    </IconButton>
                  </Stack>  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <EditDialog
        title={'Edit Level Info'}
        isOpen={openEdit}
        onClose={handleClose}
        handleEdit={handleEdit}
      >
        <LevelDialogBody
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      </EditDialog>

      <DeleteDialog
        title="Delete Level"
        isOpen={openDelete}
        onClose={handleClose}
        handleDelete={handleDelete}
        itemName={' ' + selectedRow?.name}
      />
    </div>
  );
}
