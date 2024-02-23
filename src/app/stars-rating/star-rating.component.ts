import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RatingModule, FormsModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
  @Input() rate!: number

  max = 5;
  rateBoot = 7;
  isReadonly = true;

  ngOnInit(): void {
  }
}
