import { Routes } from '@angular/router';
import { DatabasePage } from './components/database-page/database-page';
import { NotificationsPageComponent } from './components/pages/notifications.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'database', pathMatch: 'full' },
	{ path: 'database', component: DatabasePage },
	{ path: 'notifications', component: NotificationsPageComponent }
];
