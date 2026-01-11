import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.content}>
          <p>
            © {new Date().getFullYear()} TravelTrucks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
