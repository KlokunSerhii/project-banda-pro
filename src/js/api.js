import axios from 'axios';

const MOVIE_URL = `https://api.themoviedb.org/3/`;
const API_KEY = '225e339996bc91260b33199c383c8881';

// as looking by id
const example = `${MOVIE_URL}movie/550?api_key=${API_KEY}`;

// all - movie - tv - person | week - day |
const dayRoute = `${MOVIE_URL}trending/movie/day?api_key=${API_KEY}`;
const weekRoute = `${MOVIE_URL}trending/all/week?api_key=${API_KEY}`;

// genres
const genresRoute = `${MOVIE_URL}/genre/movie/list?api_key=${API_KEY}`;

// genres
const countriesRoute = `${MOVIE_URL}configuration/countries?api_key=${API_KEY}`;

//
const upcoming = `${MOVIE_URL}movie/upcoming?api_key=${API_KEY}`;

const URL_SEARCH_MOVIE = `${MOVIE_URL}/search/movie`;
const URL_GET_MOVIE = `${MOVIE_URL}/movie`;

export default class Api {
  constructor() {
    this.page = 1;
    this.totalPages = 1;

    this.searchPage = 1;
    this.totalSearchPages = 1;
    this.searchQuery = '';
  }

  nextPage() {
    this.page += 1;
  }
  prevPage() {
    this.page -= 1;
  }
  setPage(value) {
    this.page = value;
  }
  getCurrentPage() {
    return this.page;
  }
  reset() {
    this.page = 1;
  }
  nextSearchPage() {
    this.searchPage += 1;
  }

  prevSearchPage() {
    this.searchPage -= 1;
  }

  setSearchPage(value) {
    this.searchPage = value;
  }

  getCurrentSearchPage() {
    return this.searchPage;
  }

  resetSearchPage() {
    this.searchPage = 1;
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  getSearchQuery() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async dayTrends() {
    try {
      const response = await fetch(`${dayRoute}&page=${this.page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching movie data: ' + error);
    }
  }

  async weekTrends() {
    try {
      const response = await fetch(`${weekRoute}&page=${this.page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching movie data: ' + error);
    }
  }

  async upcoming() {
    try {
      const response = await fetch(`${upcoming}&page=${this.page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching movie data: ' + error);
    }
  }

  async getDetailsById(id) {
    try {
      const response = await fetch(
        `${URL_GET_MOVIE}/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching movie data: ' + error);
    }
  }

  async fetchGenres() {
    try {
      const response = await fetch(genresRoute);
      const data = await response.json();
      return data.genres;
    } catch (error) {
      throw new Error('Error fetching genres data: ' + error);
    }
  }

  async countries() {
    await new Promise(r => setTimeout(r, 1000));
    return fetch(`${countriesRoute}&page=${this.page}`).then(res => res.json());
  }

  async searchMovieByQuery(searchQuery) {
    const response = await axios.get(
      `${MOVIE_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${this.page}`
    );

    // this.incrementPage();
    return response.data;
  }

  async searhByNameYear(obj = {}) {
    let str = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false`;

    const keys = Object.keys(obj);

    if (keys.length !== 0) {
      for (const key of keys) {
        if (
          ((key === 'year' || key === 'query' || key === 'page') &&
            obj[key]) !== null
        ) {
          str += `&${key}=${obj[key]}`;
        }
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    return fetch(str).then(res => res.json());
  }

  async searhMovieKey(movie_id) {
    let str = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;

    await new Promise(r => setTimeout(r, 1000));
    return fetch(str).then(res => res.json());
  }
}