import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BlogPostDetail,
  BlogPostSummary,
  ContactPayload,
  Experience,
  Paginated,
  Profile,
  Project,
  Skill,
} from '../models/portfolio.models';

// Same-origin '/api' works both in production (Django serves Angular) and in
// dev (proxy.conf.json forwards /api to the Django dev server on :8000).
const API_BASE = '/api';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${API_BASE}/profile/`);
  }

  getProjects(featuredOnly = false): Observable<Project[]> {
    const url = featuredOnly ? `${API_BASE}/projects/?featured=true` : `${API_BASE}/projects/`;
    return this.http.get<Paginated<Project>>(url).pipe(map((res) => res.results));
  }

  getProject(slug: string): Observable<Project> {
    return this.http.get<Project>(`${API_BASE}/projects/${slug}/`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${API_BASE}/skills/`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${API_BASE}/experience/`);
  }

  getBlogPosts(): Observable<BlogPostSummary[]> {
    return this.http.get<Paginated<BlogPostSummary>>(`${API_BASE}/blog/`).pipe(map((res) => res.results));
  }

  getBlogPost(slug: string): Observable<BlogPostDetail> {
    return this.http.get<BlogPostDetail>(`${API_BASE}/blog/${slug}/`);
  }

  sendContactMessage(payload: ContactPayload): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${API_BASE}/contact/`, payload);
  }
}
