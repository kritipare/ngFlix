import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN } from './config';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  getMovies(): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/movie',
      options
    );
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options);
  }

  getRatedMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies',
      options
    );
  }

  getBannerImage(id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
  }

  getBannerVideo(id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      options
    );
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options);
  }

  getTopRated() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      options
    );
  }

  getUpcomingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      options
    );
  }
}
