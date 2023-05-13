import { Link } from "react-router-dom";
import {MailOutlined, EnvironmentOutlined  } from '@ant-design/icons';
import logo from "Assets/Images/Footer/footer-logo.svg";
import facebook from "Assets/Images/Footer/facebook.svg";
import youtube from "Assets/Images/Footer/youtube.svg";
import whatsap from "Assets/Images/Footer/whatsap.svg";
import './footer.scss'
const Footer = () => {
  return (
    <>
      <div className="footer-back">
        <footer className="footer container">
          <div className="footer__left">
            <div className="footer__left--top">
              <img src={logo} alt="logo" className="footer__left--top-logo" />
              <p className="footer__left--top-name">UROLOGIC COMPLEX</p>
            </div>
            <div className="footer__left--description">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </div>
            <div className="footer__left--call">
              <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="#">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="#">
                <img src={whatsap} alt="whatsap" />
              </a>
            </div>
          </div>

          <ul className="footer__leftMidle">
            <li>Quick Links</li>
            <li>
              <Link className="link" to="/aboutUs">
                AboutUs
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Services
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Doctors
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Appointment
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Contact
              </Link>
            </li>
          </ul>

          <ul className="footer__rightMidle">
            <li>Our Services</li>
            <li>Regular check-ups and cleanings </li>
            <li>Teeth whitening</li>
            <li>Dental Implants</li>
            <li>Fillings</li>
            <li>Root canal treatment</li>
          </ul>

          <div className="footer__right">
            <p className="footer__right--title">Clinic</p>
            <div style={{display:'flex'}}>
            <EnvironmentOutlined />
            <p className="footer__right--description">
            203 Fake St. Mountain View, San Francisco, California, USA
            </p>
            </div>
            <div style={{display:'flex'}}>
            <MailOutlined />
            <div className="footer__right--email">
                E-mail: <span>info@urologic.uz</span>
            </div>
            </div>
          </div>
        </footer>

        <div className="footerBottom container">
          <p className="footerBottom__title">© 2023, All Rights Reserved</p>

          <div className="footerBottom__right ">
            <p className="footerBottom__right--description">
              The only dental clinic you need
            </p>
            <a href="#">
              {/* <img
                src={kompanyName}
                alt="EXADOR"
                className="footerBottom__right--img"
              /> */}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;