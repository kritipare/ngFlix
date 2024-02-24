import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { VideoContent } from '../../models/video-content.interface';
import { ImagePipe } from '../../pipes/image.pipe';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, ImagePipe, DescriptionPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContents: VideoContent[] = [];
  @Input() title: string = '';
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedMovie: string | null = null;

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnInit(): void {}

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }

  setHoverMovie(movie: VideoContent) {
    this.selectedMovie = movie.title ?? movie.name; // in case title is null
  }

  clearHoverMovie() {
    this.selectedMovie = null;
  }
}
