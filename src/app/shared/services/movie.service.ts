import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTExZTJlOWZhNTQ2YzQzOTgzNDBiZGFiNmY3NDI0ZiIsInN1YiI6IjY1YzkwMTFhOGQ3N2M0MDE3YjQ2Y2IxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3pQBMjuQwgko2YtA_8d20Mo32CuA7h9yoWxbhLOo-Yc',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  getMovies() {
    return this.http.get('https://api.themoviedb.org/3/discover/movie', options)
  }
}
