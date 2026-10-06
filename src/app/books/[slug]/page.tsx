import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../site-header";
import { stories } from "../../books-data";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

function findBook(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = findBook(slug);

  if (!story) {
    return { title: "Livro não encontrado | La Magia de Fiction" };
  }

  return {
    title: `${story.title} | La Magia de Fiction`,
    description: story.description,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const story = findBook(slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="site-shell">
      <SiteHeader activePage="books" />
      <article className="book-detail-page">
        <Link className="back-to-books" href="/books">
          <span aria-hidden="true">←</span> Voltar para Books
        </Link>
        <div className="book-detail-layout">
          <div
            className="book-detail-cover"
            role="img"
            aria-label={`Capa de ${story.title}`}
            style={{
              backgroundImage: `linear-gradient(180deg, #10191312 30%, ${story.color}55 100%), url("${story.cover}")`,
            }}
          />
          <div className="book-detail-copy">
            <p className="eyebrow">La Magia · Conheça a obra</p>
            <h1>{story.title}</h1>
            <p className="book-detail-author">por {story.author}</p>
            <span className="book-detail-genre">{story.genre}</span>

            <section className="book-detail-section">
              <h2>Sobre o livro</h2>
              <p>{story.description}</p>
            </section>

            <section className="book-detail-section book-detail-highlight">
              <h2>O que você vai encontrar</h2>
              <p>{story.excerpt}</p>
            </section>

            <dl className="book-facts">
              <div>
                <dt>Autor</dt>
                <dd>{story.author}</dd>
              </div>
              <div>
                <dt>Gênero</dt>
                <dd>{story.genre}</dd>
              </div>
            </dl>

            <Link className="primary-link book-detail-cta" href="/books">
              Explorar outros livros <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
      <footer className="books-footer">
        <span>La Magia de Fiction</span>
        <span>Fantasia · Aventura · Ficção científica</span>
      </footer>
    </main>
  );
}
