import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ,FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email = new FormControl('',[Validators.required, Validators.email])
  isSubmit: boolean = false
  arrowIcon: IconDefinition = faArrowRight

  onSubmit() {
    this.isSubmit= true
    if(this.email.valid) {
      console.log('you subscribed!')
      this.email.setValue('')
      this.email.markAsUntouched();
      this.isSubmit= false
    } else {
      console.log('invalid mail')
    }
  }
}
