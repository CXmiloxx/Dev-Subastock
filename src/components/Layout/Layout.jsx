import { Outlet, Link } from "react-router-dom";
import Buscador from "./Buscador";
import NavButtons from "./NavButtons";
import "./Layout.css";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "./icons";
import SideMenu from "./SideMenu";

let justLoaded = true;

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div id="main-layout">
      <header
        className="d-flex justify-content-around align-items-center py-3 position-fixed top-0 z-2 w-100 px-3"
        style={{
          backgroundColor: "var(--bg-color)",
          gap: "20px",
          height: "var(--header-height)",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        }}
      >
        <Link to="/">
          <picture>
            <source
              srcSet="/subastock_logo.webp"
              type="image/webp"
              media="(min-width: 650px)"
            />
            <source
              srcSet="/subastock_logo_crop.webp"
              type="image/webp"
              media="(max-width: 649.99px)"
            />
            <img
              style={{ width: "auto", height: 38 }}
              src="/subastock_logo.png"
            />
          </picture>
        </Link>

        <Buscador />
        <div id="botones-nav" className="d-none d-lg-flex gap-3 flex-nowrap">
          <NavButtons />
        </div>
        <button
          className="d-flex jutify-content-center align-items-center d-lg-none"
          onClick={() => {
            if (justLoaded) justLoaded = false;
            setIsMenuOpen(!isMenuOpen);
          }}
          style={{ border: "none", appearance: "none", background: "none" }}
        >
          {isMenuOpen
            ? CloseIcon({ width: 25, height: 25, fill: "var(--primary-color)" })
            : MenuIcon({ width: 25, height: 25, fill: "var(--primary-color)" })}
        </button>
      </header>
      <div id="main-app" style={{ maxWidth: "100vw" }}>
        <div
          id="backdrop"
          onClick={() => setIsMenuOpen(false)}
          className={`d-block d-lg-none ${
            justLoaded
              ? "backdrop-hide"
              : isMenuOpen
              ? "backdrop-show"
              : "backdrop-hide"
          }
              `}
          style={{
            position: "fixed",
            top: "var(--header-height)",
            left: 0,
            width: "100%",
            height: "calc(100vh - var(--header-height))",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          className="d-lg-none"
          style={{
            height: "calc(100vh - var(--header-height))",
            width: "min(100vw, 330px)",
            position: "fixed",
            top: "var(--header-height)",
            right: isMenuOpen ? 0 : "-100%",
            transition: "right 0.3s",
            backgroundColor: "#ffffff",
            zIndex: 9999999999,
            border: "none",
          }}
        >
          <SideMenu onOptionClick={() => setIsMenuOpen(false)} />
        </div>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
