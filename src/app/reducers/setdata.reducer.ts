import {  createReducer, on } from '@ngrx/store';
import * as states from './../actions/setdata.actions';


// export const initial = localStorage.get('state') && localStorage.get('state') != '' ? JSON.parse(localStorage.get('state')) : {}
export const initial = {}

const _setDataReducer = createReducer( 
    initial, 
    on(states.setdata, (state, { data })=> data)
)

export function setDataReducer(state, action){
    return _setDataReducer(state, action)
}