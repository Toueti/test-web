import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service'; // Adjust the path as necessary

@Component({
  selector: 'app-contact', // Corrected spelling from 'conatct' to 'contact'
  templateUrl: './conatct.component.html',
  styleUrls: ['./conatct.component.css']
})
export class ConatctComponent {
  contactForm: FormGroup;
  responseMessage: string = ''; // Message to show success or error

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    // Initialize the form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          this.responseMessage = 'Your message has been sent successfully!';
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting form', error);
          this.responseMessage = 'There was an error submitting your message. Please try again.'; // Error message
        }
      });
    } else {
      console.log('Form is invalid');
      this.responseMessage = 'Please fill in all required fields correctly.'; // Feedback for invalid form
    }
  }
}
