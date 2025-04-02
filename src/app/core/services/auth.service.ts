import {Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.apiUrl;
  public isAuthenticated = signal<boolean>(this.hasAuthToken());

  constructor(private httpClient: HttpClient, private router: Router) {}

  public userRole = signal<string | null>(null);

  fetchUserRole(): void {
    this.httpClient.get<{ role: { authority: string }[] }>(`${this.API}/api/user/me`, {
      headers: { Authorization: this.getAuthHeader()! }
    }).subscribe({
      next: (data) => {
        const userRole = data.role && data.role.length > 0 ? data.role[0].authority : null;
        this.userRole.set(userRole);
      },
      error: () => this.userRole.set(null)
    });
  }

  isAdmin(): boolean {
    return this.userRole() === 'ROLE_ADMIN';
  }

  login(username: string, password: string) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
    const headers = new HttpHeaders({
      Authorization: `Basic ${encodedCredentials}`
    });

    this.httpClient.get(`${this.API}/api/annonce`, { headers }).subscribe({
      next: () => {
        sessionStorage.setItem('auth', encodedCredentials);
        this.isAuthenticated.set(true);

        this.fetchUserRole();

        this.router.navigate(['/annonces']);
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        alert('Identifiants incorrects');
      }
    });
  }


  logout() {
    sessionStorage.removeItem('auth');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private hasAuthToken(): boolean {
    return sessionStorage.getItem('auth') !== null;
  }

  getAuthHeader(): string | null {
    const authToken = sessionStorage.getItem('auth');
    return authToken ? `Basic ${authToken}` : null;
  }
}
