import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) userImg: string = '';
  @Input({ required: true }) userName: string = '';
  auth = inject(AuthService);
  navList = [
    'Home',
    'TV Shows',
    'News & Popular',
    'My List',
    'Browse by Language',
  ];
}
