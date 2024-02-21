import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition, faStar, faStarHalf
} from '@fortawesome/free-solid-svg-icons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TooltipModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
  starsTotal: number = 5
  @Input() rate!: number
  starIcon: IconDefinition = faStar

  ngOnInit(): void {
  }

  setRating(value: number) {
    this.rate = value
  }

  @ViewChild('starsInner') starsInner!: ElementRef;

  ngAfterViewInit(): void {
    this.getRatings()
  }

  getRatings() {
    const starPercentage = (this.rate / this.starsTotal) * 100
    const starPercentageRounded = `${Math.round(starPercentage /10) * 10}%`
    const starElements = this.starsInner.nativeElement as HTMLElement
    starElements.style.width = starPercentageRounded
  }
}
