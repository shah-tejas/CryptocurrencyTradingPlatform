import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule,MatTabsModule, MatStepperModule, MatStepperIntl } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, CanActivate, Router } from '@angular/router';
import { MyMaterialModule } from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

// Store
import { StoreModule } from '@ngrx/store';
import { environment } from '.././environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegisterComponent } from './register/register.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/state/app.states';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    MatToolbarModule,
    MyMaterialModule,
    MatStepperModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ name: 'App Dev Tools'}) : [],
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: LoginComponent },
      { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService]},
    
     // {path: ,component:ForgotPassword}
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  exports: [MatButtonModule,MatToolbarModule,MatTabsModule],
  providers: [{provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
    AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
