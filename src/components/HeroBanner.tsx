import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    height: "23rem",
    marginTop: "-6rem",
    "&::after": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      display: "inline-block",
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)",
      zIndex: 10,
    },
  },
  image: {
    position: "relative",
    display: "block",
    objectFit: "cover",
    objectPosition: "top",
    width: "100%",
    height: "100%",
  },
}));

export default function HeroBanner() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <img
        className={classes.image}
        src="https://assets.ellosgroup.com/i/ellos/b?$eg$&$emr$&$ep$&$ed$&n=ell_1573292-01_Fm_M0037033&mw=750&rw=750&qlt=80"
        alt=""
      ></img>
    </div>
  );
}
