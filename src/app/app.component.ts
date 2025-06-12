import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'eCommerce';

  @ViewChild('slider', { static: false }) sliderRef!: ElementRef<HTMLDivElement>;

  private slideIndex = 0;

  ngAfterViewInit(): void {
    setInterval(() => this.slide(), 5000);
  }

  private slide(): void {
    const slider = this.sliderRef?.nativeElement;
    if (!slider || !slider.children.length) return;

    this.slideIndex = (this.slideIndex + 1) % slider.children.length;
    slider.style.transform = `translateX(-${this.slideIndex * 100}%)`;
  }
}
