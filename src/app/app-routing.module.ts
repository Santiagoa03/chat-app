import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: 'chat/:userId', component: ChatComponent},
  {path: 'chat/1', component:ChatComponent },
  {path: '**',redirectTo:'chat/1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
