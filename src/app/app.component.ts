import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,CommonModule, RouterModule,FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'enfoca2-frontend';
}
