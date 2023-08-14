
import Box from '@mui/material/Box';
import { PaperCustom } from './PagerCustom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface HeaderBackProps {
    title: string,
}
const HeaderBack: React.FC<HeaderBackProps> = ({ title }) => {
    const navigate = useNavigate();
    
    const goBack = () =>{
        navigate(-1);
    }
 

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
            }}
        >
            <PaperCustom>
                <Stack direction={"row"} spacing={5}>
                    <Tooltip title={'Atrás'} onClick={goBack}>
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-haspopup="true">
                            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#ff906b' }}><ArrowBackIcon/></Avatar>
                        </IconButton>
                    </Tooltip>
                    <h1 style={{ fontSize: 40, fontWeight: 700, color: '#FFF' }}>{title}</h1>
                </Stack>
            </PaperCustom>
        </Box>


    );
}

export default HeaderBack;


