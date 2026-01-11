"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const isCatalog = pathname?.startsWith("/catalog");

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <img src="/logo.svg" alt="TravelTrucks" width={136} height={16} />
        </Link>
        <div className={css.header_nav_styling}>
          <nav aria-label="Main Navigation">
            <ul className={css.navigation}>
              <li>
                <Link href="/" className={pathname === "/" ? css.active : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className={isCatalog ? css.active : ""}>
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
