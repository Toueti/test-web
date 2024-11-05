import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8085/api/contact';

  constructor(private http: HttpClient) {}

  sendContactForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
