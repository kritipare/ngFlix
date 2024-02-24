import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieService } from '../../shared/services/movie.service';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { VideoContent } from '../../shared/models/video-content.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;

  popularMovies: VideoContent[] = [];
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((response: any) => {
      console.log(response);
      this.popularMovies = response.results;
    });
  }

  signOut() {
    this.auth.signOut();
    sessionStorage.removeItem('loggedInUser');
  }
}
