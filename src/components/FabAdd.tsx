import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import './FabAdd.scss';

interface IProps {
  onClick: () => void;
}

export default function FabAdd({ onClick }: IProps) {
  return (
    <Fab
      color="success"
      aria-label="add"
      className="add-icon"
      aria-hidden={false}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}
