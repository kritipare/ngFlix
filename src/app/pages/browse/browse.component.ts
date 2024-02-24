import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieService } from '../../shared/services/movie.service';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { VideoContent } from '../../shared/models/video-content.interface';
import { Observable, forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CarouselComponent, CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: VideoContent[] = [];
  tvShows: VideoContent[] = [];
  ratedMovies: VideoContent[] = [];
  nowPlayingMovies: VideoContent[] = [];
  popularMovies: VideoContent[] = [];
  topRatedMovies: VideoContent[] = [];
  upcomingMovies: VideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated(),
  ];
  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(
        map(([movies, tvShows, nowPlaying, upcoming, popular, topRated]) => {
          this.bannerDetail$ = this.movieService.getBannerDetail(
            movies.results[0].id
          );
          this.bannerVideo$ = this.movieService.getBannerVideo(
            movies.results[0].id
          );
          return {
            movies,
            tvShows,
            nowPlaying,
            upcoming,
            popular,
            topRated,
          };
        })
      )
      .subscribe((response: any) => {
        this.movies = response.movies.results as VideoContent[];
        this.tvShows = response.tvShows.results as VideoContent[];
        this.nowPlayingMovies = response.nowPlaying.results as VideoContent[];
        this.upcomingMovies = response.upcoming.results as VideoContent[];
        this.popularMovies = response.popular.results as VideoContent[];
        this.topRatedMovies = response.topRated.results as VideoContent[];
        this.getMovieKey();
      });
  }

  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id).subscribe((res) => {
      console.log(res);
    });
  }

  signOut() {
    this.auth.signOut();
    sessionStorage.removeItem('loggedInUser');
  }
}
