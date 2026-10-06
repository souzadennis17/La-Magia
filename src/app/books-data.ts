export type Story = {
  slug: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  cover: string;
  color: string;
  excerpt: string;
};

export const stories: Story[] = [
  {
    slug: "harry-potter-pedra-filosofal",
    title: "Harry Potter e a Pedra Filosofal",
    author: "J. K. Rowling",
    genre: "Fantasia",
    description:
      "Um garoto descobre um mundo de magia e começa uma jornada de amizade, descobertas e coragem.",
    cover: "https://tse1.mm.bing.net/th/id/OIP.3-B_PVed_7T_po25nI7NPwHaLS?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    color: "#203c39",
    excerpt:
      "Uma porta para um universo fantástico, onde aprender sobre si mesmo é tão importante quanto descobrir os mistérios ao redor.",
  },
  {
    slug: "peter-pan",
    title: "Peter Pan",
    author: "J. M. Barrie",
    genre: "Fantasia e aventura",
    description:
      "Uma viagem a uma ilha extraordinária transforma a infância, a imaginação e a aventura em protagonistas.",
    cover: "https://m.media-amazon.com/images/I/91yyFwNY9fL._SL1500_.jpg",
    color: "#233449",
    excerpt:
      "Uma história sobre crescer, sonhar e escolher o próprio caminho, contada com o encanto de uma aventura fantástica.",
  },
  {
    slug: "jurassic-park",
    title: "Jurassic Park",
    author: "Michael Crichton",
    genre: "Ficção científica",
    description:
      "Uma inovação científica leva visitantes a um parque extraordinário e levanta questões sobre os limites da tecnologia.",
    cover: "https://tse3.mm.bing.net/th/id/OIP.2Mnmq1oYBYzZ0qYRYFnW-QHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    color: "#425544",
    excerpt:
      "Suspense e ciência se encontram em uma aventura sobre ambição, responsabilidade e forças difíceis de controlar.",
  },
  {
    slug: "o-leao-a-feiticeira-e-o-guarda-roupa",
    title: "O Leão, a Feiticeira e o Guarda-Roupa",
    author: "C. S. Lewis",
    genre: "Fantasia",
    description:
      "Uma passagem inesperada conduz quatro irmãos a um reino fantástico marcado por magia, coragem e esperança.",
    cover: "https://tse4.mm.bing.net/th/id/OIP.8xs4Q8PK3qtJW6YjQZoyigHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    color: "#39434b",
    excerpt:
      "Uma aventura sobre família, escolhas e esperança em um mundo onde o impossível pode estar logo depois da porta.",
  },
];
