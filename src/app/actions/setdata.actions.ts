import { createAction, props } from '@ngrx/store'


export const setdata = createAction('setdata', props<{ data: any }>())