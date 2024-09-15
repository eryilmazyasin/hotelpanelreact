import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import './FabAdd.scss';

export default function FabAdd() {
  return (
    <Fab color="success" aria-label="add" className="add-icon">
      <AddIcon />
    </Fab>
  );
}
