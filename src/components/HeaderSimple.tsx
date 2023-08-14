
import Box from '@mui/material/Box';
import { PaperCustom } from './PagerCustom';
import Stack from '@mui/material/Stack';

interface HeadeSimpleProps {
    title: string,
}
const HeaderSimple: React.FC<HeadeSimpleProps> = ({title}) => {
 
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: '98%',
                height: "80px",
                },
            }}>
            <PaperCustom>
            <Stack direction={"row"} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }} spacing={5}>
                    <h1 style={{fontSize:35, fontWeight:700, color:'#FFF'}}>{title}</h1>
                </Stack>
            </PaperCustom>                 
        </Box>
        

    );
}

export default HeaderSimple;

/*
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px #fff;
    text-transform: uppercase;
*/ 

