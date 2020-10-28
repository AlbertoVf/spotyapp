import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQC8RG8kyEngBXWa5sVSaXVs9rIYGV5ppaPqeSapeUihOlZsh4jITISOL74pxjY62S9TJutYmvHzEqlSexI',
    });
    return this.http.get(`https://api.spotify.com/v1/${query}`, { headers });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases').pipe(
      map((data) => data['albums'].items)
    );
  }

  getArtists(artista: string): Observable<any> {
    return this.getQuery(`search?q=${artista}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }

  getArtist(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }
}
