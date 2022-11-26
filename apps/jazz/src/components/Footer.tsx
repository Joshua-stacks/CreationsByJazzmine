import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <div className='flex justify-between items-center'>
      Connect with us:
      <div>
        <Web href="https://www.instagram.com/creationsbyjazzminerose/">
          <InstagramIcon />
        </Web>
        <Web href="https://www.facebook.com/kidspartiesandmore">
          <FacebookIcon />
        </Web>
        <EmailIcon />
        <PhoneEnabledIcon />
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  color: white;
  margin-top: auto;
  height: 80px;
`;
const Web = styled.a`
  color: white;
`;
export default Footer;
