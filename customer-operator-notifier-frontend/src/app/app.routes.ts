import { Routes } from '@angular/router';
import { DatabasePage } from './components/database-page/database-page';
import { NotifcationsPage } from './components/notifcations-page/notifcations-page';

export const routes: Routes = [
	{ path: '', redirectTo: 'database', pathMatch: 'full' },
	{ path: 'database', component: DatabasePage },
	{ path: 'notifications', component: NotifcationsPage }
];
