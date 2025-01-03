import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  const version = new Date().getTime(); 
  return new TranslateHttpLoader(http, './i18n/', `.json?v=${version}`);
}