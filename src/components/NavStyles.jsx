import { Typography as MuiTypography } from '@mui/material'
import styled from "@emotion/styled";

const Typography=styled(MuiTypography)(({theme})=>({
    '& .logoLg':{
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display:'block',
        },
    },
    '& .logoSm':{
        display:'block',
        [theme.breakpoints.up('sm')]:{
            display:'block',
        },
    }
}))

export default Typography