import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  card: {
    maxWidth: '20rem',
  }
}));

function MouseOverPopover(input) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const helpContentIn1 = input["helpContent1"];
  const helpContentIn2 = input["helpContent2"];
  const helpContentIn3 = input["helpContent3"];
  const helpContentIn4 = input["helpContent4"];
  const helpContentIn5 = input["helpContent5"];
  const helpContentIn6 = input["helpContent6"];
  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <HelpIcon className={classes.rightIcon} />
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div id="div1" className={classes.card}>
          <p id="p1">{helpContentIn1}</p>
          <p id="p2">{helpContentIn2}</p>
          <p id="p3">{helpContentIn3}</p>
          <p id="p4">{helpContentIn4}</p>
          <p id="p5">{helpContentIn5}</p>
          <p id="p6">{helpContentIn6}</p>
        </div>
      </Popover>
    </div>
  );
}

export default MouseOverPopover;