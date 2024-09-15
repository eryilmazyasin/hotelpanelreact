import React from 'react';

import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import './Homepage.scss';

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} className="homepage-wrapper">
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(100)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3, lg: 2 }}>
            <div className="card">
              <div className="card-title">
                <BedroomParentIcon />
                <span>Oda {index + 1}</span>
              </div>
              <div className="card-body">
                <span>Deluxe Oda</span>
                {/* //rezarvasyon yapılmış ise bu blok aktif olacak */}
                <div className="reservation-info">
                  {/* <span className="reservation-name">
                    <CheckIcon /> Yasin Eryılmaz
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  </span> 

                  <span>
                    <br />
                    <DoNotDisturbOnIcon />
                    <br />
                    Bu oda kullanım dışı.
                  </span>
                  */}
                </div>
              </div>

              {/* //rezarvasyon yapılmış ise bu blok aktif olacak */}
              {/* <div className="date">
                <span>15.09.2021</span>
                <br />
                <span>20.09.2021</span>
              </div> */}
              <Button variant="contained">Rezervasyon Yap</Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
