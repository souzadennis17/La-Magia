import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | La Magia de Fiction",
  description: "Explore a coleção de livros de fantasia, aventura e ficção científica da La Magia.",
};

export default function BooksLayout({ children }: LayoutProps<"/books">) {
  return children;
}
