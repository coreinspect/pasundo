"use client";
import "./nav.css";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPhoneFlip } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className=" header-content">
      <div className="container header-top">
        {/* Logo Container */}
        <div className="header-top__logo">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={300}
            className="logo"
          />
        </div>

        {/* Header Info  */}
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

          {/* Hamburger Button */}
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

      {/* Nav */}
      <nav
        className={`container nav ${isMenuOpen ? "open" : ""} ${
          isScrolled ? "fixed-nav" : ""
        }`}
      >
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/">Home </Link>
          </li>
          <li className="nav-item">
            <Link href="/#about">About </Link>
          </li>
          <li className="nav-item">
            <Link href="/#whypasundo">Services </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact">Contact </Link>
          </li>
        </ul>

        {/* Responsive Header Info*/}
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
  );
};

export default Nav;
