import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LangDefinition,
  TranslocoDirective,
  TranslocoService,
} from '@jsverse/transloco';
import { map } from 'rxjs';
import { ACTIVE_LANG_KEY } from '../app.consts';
import { clickable } from './classes';
import { UiService } from './ui.service';

@Component({
  template: `
    <ng-container *transloco="let t">
      <div class="navbar bg-base-100">
        <ul class="menu menu-horizontal px-1 flex w-full justify-between">
          <li class="hidden sm:block">
            <details>
              <summary class="font-extrabold text-sm">essence</summary>
              <ul class="bg-base-100 rounded-t-none p-2">
                <li class="w-60">
                  <a
                    class="no-underline"
                    target="_blank"
                    href="https://github.com/AntennaTower/essence"
                    >{{ t('nav.links.github.active') }}</a
                  >
                </li>
                <li>
                  <a
                    class="no-underline"
                    target="_blank"
                    href="https://github.com/AntennaTower/essence/blob/0c98757994e3a2cf4bf523d9fb2ed72ec0649549/readme.md#usage"
                    >{{ t('nav.links.followUs.active') }}</a
                  >
                </li>
              </ul>
            </details>
          </li>

          <div class="flex">
            <li
              (click)="goto('overview')"
              [ngClass]="[isDisabled('overview') ? 'hidden' : '']"
            >
              <a class="no-underline">{{
                $route() === 'overview'
                  ? t('nav.links.overview.active')
                  : t('nav.links.overview.inactive')
              }}</a>
            </li>
            <li
              (click)="goto('posts')"
              [ngClass]="[isDisabled('posts') ? 'hidden' : '']"
            >
              <a class="no-underline">
                {{
                  $route() === 'posts'
                    ? t('nav.links.posts.active')
                    : t('nav.links.posts.inactive')
                }}
              </a>
            </li>
            <li
              (click)="goto('tags')"
              [ngClass]="[isDisabled('tags') ? 'hidden' : '']"
            >
              <a class="no-underline">
                {{
                  $route() === 'tags'
                    ? t('nav.links.tags.active')
                    : t('nav.links.tags.inactive')
                }}
              </a>
            </li>
          </div>
          <div class="flex">
            <li (click)="goto('')">
              <a>{{ t('nav.links.search.active') }}</a>
            </li>
          </div>
        </ul>
      </div>
    </ng-container>
    @if (uiService.$isLoading()) {
      <progress class="progress w-full"></progress>
    }
  `,
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TranslocoDirective],
})
export class NavbarComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly uiService = inject(UiService);

  protected readonly clickable = clickable;

  private readonly $userInView = toSignal(
    this.route.params.pipe(map((p) => p['username'])),
  );

  protected readonly $route = signal('');

  constructor() {
    const _currRoute = window.location.pathname.split('/')[1];
    this.$route.set(_currRoute);
  }

  protected goto(route: string): void {
    if (route === '') {
      this.router.navigate(['/']);
    } else {
      if (!this.$userInView()) return;
      this.router.navigate([`/${route}/${this.$userInView()}`]);
    }
  }

  protected isDisabled(route: string): boolean {
    if (route === '') return false;
    return !this.$userInView();
  }

  protected onLangChange(lang: LangDefinition): void {
    localStorage.setItem(ACTIVE_LANG_KEY, lang.id);
    this.translocoService.setActiveLang(lang.id);
  }
}
