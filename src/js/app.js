import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { UserComponent } from './components/user.component';
import { NewsComponent } from './components/news.component';
import { ActiveRoute } from './core/active.route.service';
import { container } from './view/uiElements.config';

const routes = {
    '/': new HomeComponent(),
    '/login': new LoginComponent(),
    '/signup': new SignupComponent(),
    '/users/:id': new UserComponent(),
    '/news': new NewsComponent(),
    '**': new NotFoundComponent()
};

const activeRoute = new ActiveRoute();

const router = async () => {
    const request = activeRoute.parseRequestURL();
    const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

    const component = routes[url] || routes['**']; 
    
    await component.beforeRender();
    if (url !== '/news') { container.innerHTML = component.render() };
    component.afterRender();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);