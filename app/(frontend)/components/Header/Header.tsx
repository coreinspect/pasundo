"use client";

import Image from "next/image";
import "./header.css";
import { GiSteeringWheel } from "react-icons/gi";
import { BsPhoneFlip } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <video
        className="header-video"
        src="/videos/header.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="header-overlay"></div>
      <div className=" header-content">
        <div className="container header-top">
          <div className="header-top__logo">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="logo"
            />
          </div>
          <div className="header-top__info">
            <p className="drive-us">
              <span>
                <GiSteeringWheel className="icon" />
              </span>
              Drive with us
            </p>
            <p className="get-ride">
              <span>
                <BsPhoneFlip className="icon" />
              </span>
              Get a ride in minutes
            </p>
            <button
              className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <nav className={`container nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/">Home </Link>
            </li>
            <li className="nav-item">
              <Link href="/">About </Link>
            </li>
            <li className="nav-item">
              <Link href="/">Services </Link>
            </li>
            <li className="nav-item">
              <Link href="/">Contact </Link>
            </li>
          </ul>
          <div className="header-top__responsive">
            <p className="drive">
              <span>
                <GiSteeringWheel className="icon" />
              </span>
              Drive with us
            </p>
            <p className="get-rides">
              <span>
                <BsPhoneFlip className="icon" />
              </span>
              Get a ride in minutes
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
