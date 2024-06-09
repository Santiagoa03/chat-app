import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Inicio',
      route: '',
    },
    {
      icon: 'chat',
      label: 'Contacto 1',
      route: 'chat/1'
    },
    {
      icon: 'chat',
      label: 'Contacto 2',
      route: 'chat/2'
    }

  ];
}
