import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {
  userQuery: string = '';
  loading: boolean = false;
  conversation: { text: string; sender: 'user' | 'ai' }[] = [];

  constructor(private http: HttpClient) {}

  askAI() {
    if (!this.userQuery.trim()) return;

    const prompt = this.userQuery.trim();
    this.conversation.push({ text: prompt, sender: 'user' });
    this.loading = true;

    this.http.post<{ reply: string }>('https://cookshareweb.onrender.com/api/openai', { prompt })
      .subscribe({
        next: (res) => {
          this.conversation.push({ text: res.reply, sender: 'ai' });
          this.userQuery = '';
          this.loading = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.conversation.push({ text: 'Hubo un error al contactar con el asistente.', sender: 'ai' });
          this.loading = false;
        }
      });
  }
}
