import Link from "next/link";
import SiteHeader from "./site-header";

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader activePage="home" />
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">Bem-vindo a La Magia</p>
          <h1>“Um livro não muda o mundo; muda a mente de quem, um dia, poderá mudá-lo.”</h1>
          <p className="home-description">
            Entre em histórias de magia, aventuras inesquecíveis e descobertas
            que fazem a imaginação viajar.
          </p>
          <Link className="primary-link" href="/books">
            Explorar os livros <span aria-hidden="true">→</span>
          </Link>
          <p className="home-note">Fantasia · Aventura · Ficção científica</p>
        </div>
        <Link className="home-feature" href="/books" aria-label="Explorar a coleção de livros">
          <span className="home-feature-art" />
          <span className="home-feature-caption">
            <span>COMECE SUA PRÓXIMA AVENTURA</span>
            <strong>Descubra o livro que vai abrir um novo mundo.</strong>
            <span className="feature-link">Ver coleção <span aria-hidden="true">↗</span></span>
          </span>
        </Link>
        <span className="home-side-note" aria-hidden="true">HISTÓRIAS PARA IMAGINAR</span>
      </section>
      <footer className="home-footer">
        <span>La Magia de Fiction</span>
        <span>Livros, aventuras e mundos possíveis.</span>
      </footer>
    </main>
  );
}
