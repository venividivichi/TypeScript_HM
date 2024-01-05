
interface Author { id: number, name: string }
  
interface Book { id: number, title: string, authorId: number }
  
interface BookService {
    getBooks(): Book[],
    getAuthors(): Author[]
}

class MyBookService implements BookService {
    
    authors: Author[] = [
      { id: 1, name: 'Василь Стус' },
      { id: 2, name: 'Тарас Шевченко' },
      { id: 3, name: 'Ліна Костенко' },
    ];
  
    books: Book[] = [
      { id: 1, title: 'Круговерть', authorId: 1 },
      { id: 2, title: 'Кобзар', authorId: 2 },
      { id: 3, title: 'Гайдамаки', authorId: 2 },
      { id: 4, title: 'Палімпсести', authorId: 1 },
      { id: 5, title: 'Триста поезій', authorId: 3 },
    ];
  
    getBooks(): Book[] {
      return this.books;
    }
  
    getAuthors(): Author[] {
      return this.authors;
    }
  }

let bookService: BookService = new MyBookService();

let books: Book[] = bookService.getBooks();
let authors: Author[] = bookService.getAuthors();

console.log('All books:', books);
console.log('All authors:', authors);