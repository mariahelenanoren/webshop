import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    height: "23rem",
    marginTop: "-6rem",
    "&::after": {
      content: "'Heminredning & Dekoration'",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffff",
      fontSize: "2rem",
      textAlign: "center",
      textShadow: "0px 1.5px 1px rgba(0, 0, 0, 0.3)",
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 30%)",
      zIndex: 10,
    },
  },
  image: {
    position: "relative",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
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
        src="https://www.nordicnest.se/4a25c6/globalassets/inspiration-se/trender--livsstil/torkade-blommor-200730/torkade-blommor-inredning-toppbild-2.jpg"
        alt=""
      ></img>
    </div>
  );
}
