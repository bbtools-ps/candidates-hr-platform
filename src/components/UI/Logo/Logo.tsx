import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div>
      <a href="./" className={classes.logo}>
        <div className={classes.text}>
          <span className={classes.heading}>Candidates</span>
          <span className={classes.subheading}>HR assistance plaform</span>
        </div>
        <svg
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 293.71 202.57"
        >
          <circle cx="146.72" cy="56.97" r="29.19" />
          <path
            d="M193.19,101.7S187,93,171.27,87.8a48.24,48.24,0,0,1-48.3,0,43,43,0,0,0-23.16,15.33s12.11,25.08,49.9,25.08C163.32,128.21,183.57,118.63,193.19,101.7Z"
            transform="translate(0)"
          />
          <circle cx="44.04" cy="61.45" r="22.61" />
          <circle cx="249.11" cy="61.45" r="22.61" />
          <path
            d="M70,89.05a14.86,14.86,0,0,0-6.23-2.89s-18.54,11-38.5,0c0,0-25.66,5.56-25.31,32.3H82.87S72.18,103.84,70,89.05Z"
            transform="translate(0)"
          />
          <path
            d="M211,116.14s8.91-13,11.41-27.45l7-2.53s18.71,11.54,39.39,0c0,0,24.95,6.63,24.95,32.47h-80.2Z"
            transform="translate(0)"
          />
          <path
            d="M279.63,182.26s-51.86-49.9-55.07-52.22-7.67-1.07-7.67-1.07l-12.47-11.82h0a72.92,72.92,0,1,0-11.1,11.61l12,12.16a16.65,16.65,0,0,0,1.78,7.84l54.54,52s7.3,5.17,15.15-2.14S279.63,182.26,279.63,182.26ZM146.5,133.49a60.6,60.6,0,1,1,60.59-60.6A60.6,60.6,0,0,1,146.5,133.49Z"
            transform="translate(0)"
          />
        </svg>
      </a>
    </div>
  );
};

export default Logo;