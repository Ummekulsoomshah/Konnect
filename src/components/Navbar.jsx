import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Typography from './NavStyles'
export default function Navbar() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant='h6' className='logoLg'>
                    dev
                </Typography>
                <Typography variant='h6' className='logoSm'>
                    dev2
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
