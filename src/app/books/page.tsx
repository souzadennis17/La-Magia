"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "../site-header";
import { stories, type Story } from "../books-data";

const genres = ["Todos", ...new Set(stories.map((story) => story.genre))];
const favoritesStorageKey = "la-magia-de-fiction-favorites";

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Todos");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = window.localStorage.getItem(favoritesStorageKey);
        if (storedFavorites) {
          const parsedFavorites: unknown = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites) && parsedFavorites.every((item) => typeof item === "string")) {
            setFavorites(parsedFavorites);
          }
        }
      } catch {
        window.localStorage.removeItem(favoritesStorageKey);
      }
      setFavoritesLoaded(true);
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (favoritesLoaded) {
      window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
    }
  }, [favorites, favoritesLoaded]);

  const filteredStories = stories.filter((story) => {
    const matchesQuery = `${story.title} ${story.author} ${story.genre}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.toLocaleLowerCase("pt-BR"));
    const matchesGenre = activeGenre === "Todos" || story.genre === activeGenre;
    const matchesFavorites = !showFavorites || favorites.includes(story.title);
    return matchesQuery && matchesGenre && matchesFavorites;
  });

  function toggleFavorite(title: string) {
    setFavorites((current) =>
      current.includes(title)
        ? current.filter((favorite) => favorite !== title)
        : [...current, title],
    );
  }

  return (
    <main className="site-shell">
      <SiteHeader activePage="books" />
      <section className="books-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A coleção La Magia</p>
            <h1>Books<span>.</span></h1>
            <p className="books-intro">Escolha uma história e descubra um mundo novo.</p>
          </div>
          <span className="story-total">{filteredStories.length.toString().padStart(2, "0")} livros</span>
        </div>

        <div className="library-tools">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar por título, autor ou gênero"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Buscar livros"
            />
          </label>
          <div className="book-tools-right">
            <div className="genre-list" aria-label="Filtrar por gênero">
              {genres.map((genre) => (
                <button
                  className={`genre-button${activeGenre === genre ? " genre-active" : ""}`}
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  aria-pressed={activeGenre === genre}
                >
                  {genre}
                </button>
              ))}
            </div>
            <button
              className={`favorites-filter${showFavorites ? " favorites-filter-active" : ""}`}
              onClick={() => setShowFavorites((current) => !current)}
              aria-pressed={showFavorites}
            >
              ♡ Minha lista <span>{favorites.length}</span>
            </button>
          </div>
        </div>

        {filteredStories.length > 0 ? (
          <div className="books-grid">
            {filteredStories.map((story) => {
              const isFavorite = favorites.includes(story.title);
              return (
                <article className="book-card" key={story.title}>
                  <button
                    className="book-cover-button"
                    onClick={() => setActiveStory(story)}
                    aria-label={`Ver detalhes de ${story.title}`}
                  >
                    <span
                      className="book-cover"
                      style={{ backgroundImage: `url("${story.cover}")` }}
                    />
                  </button>
                  <div className="book-card-meta">
                    <span>{story.genre}</span>
                    <button
                      className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
                      onClick={() => toggleFavorite(story.title)}
                      aria-label={isFavorite ? `Remover ${story.title} da lista` : `Salvar ${story.title}`}
                      aria-pressed={isFavorite}
                    >
                      {isFavorite ? "♥" : "♡"}
                    </button>
                  </div>
                  <h2>{story.title}</h2>
                  <p className="book-author">por {story.author}</p>
                  <p className="book-description">{story.description}</p>
                  <Link className="book-details-link" href={`/books/${story.slug}`}>
                    Conheça tudo sobre o livro <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">∅</span>
            <h2>Nenhum livro encontrado.</h2>
            <p>Tente outra busca ou altere os filtros.</p>
            <button onClick={() => { setQuery(""); setActiveGenre("Todos"); setShowFavorites(false); }}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      <footer className="books-footer">
        <span>La Magia de Fiction</span>
        <span>Fantasia · Aventura · Ficção científica</span>
      </footer>

      {activeStory && (
        <div className="dialog-backdrop" onClick={() => setActiveStory(null)}>
          <section
            className="story-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="dialog-close" onClick={() => setActiveStory(null)} aria-label="Fechar detalhes">×</button>
            <div
              className="dialog-art"
              style={{ backgroundImage: `url("${activeStory.cover}")` }}
            />
            <div className="dialog-copy">
              <p className="eyebrow">Uma aventura para descobrir</p>
              <h2 id="dialog-title">{activeStory.title}</h2>
              <p className="dialog-description">{activeStory.description}</p>
              <div className="excerpt-block">
                <span>SOBRE ESTA OBRA</span>
                <p>{activeStory.excerpt}</p>
              </div>
              <button
                className="dialog-save"
                onClick={() => toggleFavorite(activeStory.title)}
              >
                {favorites.includes(activeStory.title) ? "♥  Salvo na minha lista" : "♡  Salvar na minha lista"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
