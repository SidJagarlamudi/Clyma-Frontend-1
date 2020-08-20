import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 304,
    margin: 'auto',
    // boxShadow: 'none',
    borderRadius: 0,
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial'
  },
}));
const useStyles2 = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function NewsCard(props) {
  const styles = useStyles();
  const modalStyles = useStyles2()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  console.log('step 2')
  console.log(props.article)
  const randomImgHeight = Math.floor(Math.random() * (400 - 200 + 1) ) + 200;
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        style={{height: `${randomImgHeight}px`}}
        // classes={mediaStyles}
        className='news-img'
        image={props.article.urlToImage}
      />
      <CardContent className={styles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          overline={props.article.publishedAt}
          heading={props.article.title}
          body={props.article.description}
        />
        <Button color={'primary'} fullWidth className={styles.cta} onClick={handleOpen}>
          Find Out More <ChevronRightRounded />
        </Button>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modalStyles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={modalStyles.paper}>
            <h2 id="transition-modal-title">{props.article.title}</h2>
            <p a href={props.article.url} id="transition-modal-description">{props.article.content}</p>
          </div>
        </Fade>
      </Modal>
      </CardContent>
    </Card>
  );
}

export default NewsCard