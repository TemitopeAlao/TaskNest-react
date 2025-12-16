function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__info">
          <span className="logo__text">
            <a href="#" className="logo__text">
              TaskNest
            </a>
          </span>
          <p className="footer__text">
            Stay organized, stay focused with TaskNest.
          </p>

          <ul className="social-logos">
            <li>
              <a href="#">
                <ion-icon name="logo-facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-linkedin" />
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <ion-icon name="logo-youtube" />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4 className="footer__heading">Contact Us</h4>
          <p>Email: support@tasknest.com</p>
          <p>Phone: +234 0000000000</p>
        </div>
      </div>

      <p className="footer__copyright">
        © {new Date().getFullYear()} TaskNest. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
