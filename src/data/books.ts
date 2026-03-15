export interface Book {
    id: string;
    title: string;
    author: string;
    location: string;
    cover: string;
}

export const BOOKS: Book[] = [
    {
        id: "1",
        title: "The Book Thief",
        author: "Markus Zusak",
        location: "Germany",
        cover: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
    },
    {
        id: "2",
        title: "The Great Alone",
        author: "Kristin Hannah",
        location: "Alaska",
        cover: "https://covers.openlibrary.org/b/isbn/9780312577230-L.jpg",
    },
    {
        id: "3",
        title: "The Forty Rules of Love",
        author: "Elif Shafak",
        location: "Turkey",
        cover: "https://covers.openlibrary.org/b/isbn/9780143118527-L.jpg",
    },
    {
        id: "4",
        title: "A Thousand Splendid Suns",
        author: "Khaled Hosseini",
        location: "Afghanistan",
        cover: "https://covers.openlibrary.org/b/isbn/9781594489501-L.jpg",
    },
    {
        id: "5",
        title: "As Long as the Lemon Trees Grow",
        author: "Zoulfa Katouh",
        location: "Syria",
        cover: "https://m.media-amazon.com/images/I/91YowFGeWiL._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: "6",
        title: "All the Light We Cannot See",
        author: "Anthony Doerr",
        location: "France",
        cover: "https://covers.openlibrary.org/b/isbn/9781476746586-L.jpg",
    },
    {
        id: "7",
        title: "Pachinko",
        author: "Min Jin Lee",
        location: "Korea",
        cover: "https://covers.openlibrary.org/b/isbn/9781455563937-L.jpg",
    },
    {
        id: "8",
        title: "A Gentleman in Moscow",
        author: "Amor Towles",
        location: "Moscow",
        cover: "https://covers.openlibrary.org/b/isbn/9780670026197-L.jpg",
    },
    {
        id: "9",
        title: "The Stationery Shop of Tehran",
        author: "Marjan Kamali",
        location: "Tehran",
        cover: "https://static-01.daraz.com.bd/p/5f017baaa579ebcc1653519ea1a8ad37.jpg",
    }
];
