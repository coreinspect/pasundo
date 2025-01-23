"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NotFound() {
  const pathname = usePathname();
  const cleanPath = pathname?.replace(/^\//, "") || "";

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">
          <span className="not-found-path">{cleanPath}</span> Page Not Found
        </h2>
        <p className="not-found-text">
          The page you are looking for doesn&apos;t exist or currently
          we&apos;re working on it.
        </p>

        <Link href="/" className="not-found-button">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
