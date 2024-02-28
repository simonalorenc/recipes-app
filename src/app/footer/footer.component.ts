import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ,FontAwesomeModule, AlertModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  email = new FormControl('',[Validators.required, Validators.email])
  isSubmit: boolean = false
  showSuccessAlert: boolean = false
  arrowIcon: IconDefinition = faArrowRight

  onSubmit() {
    this.isSubmit= true
    if(this.email.valid && this.isSubmit) {
      console.log('teraz')
    }
    if(this.email.valid) {
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
      this.email.setValue('')
      this.email.markAsUntouched();
      this.isSubmit= false
    } else {
      return
    }
  }
}
