
interface Movie {
    name: string;
    releaseYear: number;
    rating: number;
    awards: string[];
}
  
interface Category {
    name: string;
    movies: Movie[];
}
  
type MatchFilter = {
    filter: string;
};
  
type RangeFilter = {
    filter: number;
    filterTo: number;
};
  
type ValuesFilter = {
    values: string[];
};
  
type MovieFilterState = {
    name?: MatchFilter;
    releaseYear?: RangeFilter;
    rating?: RangeFilter;
    awards?: ValuesFilter;
};
  
type CategoryFilterState = {
    name?: MatchFilter;
};

class MovieList {
    private movies: Movie[] = [];
    private filterState: MovieFilterState = {};
  
    constructor(movies: Movie[]) {
      this.movies = movies;
    }
  
    applySearchValue(searchValue: string) {
      this.filterState.name = { filter: searchValue };
    }
  
    applyFiltersValue(filters: MovieFilterState) {
      this.filterState = filters;
    }
  
    addMovie(movie: Movie) {
      this.movies.push(movie);
    }
  
    filterMovies(): Movie[] {
      
      return this.movies;
    }
  }

  class CategoryList {
    private categories: Category[] = [];
    private filterState: CategoryFilterState = {};
  
    constructor(categories: Category[]) {
      this.categories = categories;
    }
  
    applySearchValue(searchValue: string) {
      this.filterState.name = { filter: searchValue };
    }

    applyFiltersValue(filters: CategoryFilterState) {
        this.filterState = filters;
      }
  
    addCategory(category: Category) {
      this.categories.push(category);
    }
  
    filterCategories(): Category[] {
      
      return this.categories;
    }
  }