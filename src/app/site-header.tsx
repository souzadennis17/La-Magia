import Link from "next/link";

type SiteHeaderProps = {
  activePage: "home" | "books";
};

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="La Magia, página principal">
        <span className="wordmark-mark" aria-hidden="true" />
        <span>La Magia</span>
      </Link>
      <nav className="main-nav" aria-label="Navegação principal">
        <Link className={activePage === "home" ? "nav-current" : ""} href="/">
          La Magia
        </Link>
        <Link className={activePage === "books" ? "nav-current" : ""} href="/books">
          Books
        </Link>
      </nav>
    </header>
  );
}
