import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {
  userQuery: string = '';
  loading: boolean = false;
  conversation: { sender: 'user' | 'ai', text: string }[] = [];
  constructor(private openAI: OpenAIService) {}

  askAI() {
    if (!this.userQuery.trim()) {
      this.conversation.push({ sender: 'ai', text: 'Por favor, escribe tus preferencias o pregunta.' });
      this.userQuery = '';
      return;
    }
    this.loading = true;
    this.conversation.push({ sender: 'user', text: this.userQuery });
    const currentQuery = this.userQuery;
    this.userQuery = '';
    this.openAI.ask(currentQuery).subscribe(
      res => {
        this.conversation.push({ sender: 'ai', text: res.reply });
        this.loading = false;
      },
      err => {
        this.conversation.push({ sender: 'ai', text: 'Error: ' + (err.error?.error || 'Unknown error') });
        this.loading = false;
      }
    );
  }
}
