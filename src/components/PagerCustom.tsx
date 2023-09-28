import { styled } from '@mui/material/styles';
import { Paper, PaperProps } from '@mui/material';
import background from '../images/background_2.png'

export const PaperCustom = styled(Paper)<PaperProps>(({ theme }) => ({
  backgroundColor: '#DA1C36',
  backgroundAttachment: "inherit",
  backgroundPosition: "center",
  borderRadius: 20,
  width: "100%",
  height: 150,
  margin: 10,
  padding: 10,
  elevation: 3,
}));

export default function StyledCustomization() {
  return <PaperCustom defaultValue={30} elevation={3} />;
}
