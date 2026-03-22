import { Routes } from '@angular/router';
import { DatabasePageComponent } from './components/pages/database-page.component';
import { NotificationsPageComponent } from './components/pages/notifications.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'database', pathMatch: 'full' },
	{ path: 'database', component: DatabasePageComponent },
	{ path: 'notifications', component: NotificationsPageComponent }
];
