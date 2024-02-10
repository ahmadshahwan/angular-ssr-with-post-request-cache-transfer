import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
const FILM_QUERY = `
{
  film(id: "ZmlsbXM6MQ==") {
    title
  }
}
`;

const PERSON_QUERY = `
{
  person(id: "cGVvcGxlOjE") {
    id
    name
  }
}
`;

type FilmResponse = { data: { film: { title: string } } };
type PersonResponse = { data: { person: { name: string } } };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title: Observable<string> = of('');
  name: Observable<string> = of('');

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.title = this.http.post<FilmResponse>(API_URL, { query: FILM_QUERY })
      .pipe(map(r => r.data.film.title));

    this.name = this.http.post<PersonResponse>(API_URL, { query: PERSON_QUERY })
      .pipe(map(r => r.data.person.name));
  }
}
