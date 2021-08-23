import { Button, Container, Link, Typography } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import { externalLinks } from "../configs/config";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body1" color="textSecondary">
        Created with <span role="img">🔌</span> at home for Kontextsensitive
        Systeme {new Date().getFullYear()}
        </Typography>
        <Button startIcon={<GitHubIcon />} onClick={() => window.open(externalLinks["repository"])} >Repository</Button>
      </Container>
    </footer>
  );
}

export default Footer;
