import { AddManyStickiesAction, AddStickyAction } from './../store/actions/sticky.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sticky } from './../models/sticky';

import { Observable } from 'rxjs';
import { take, concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';