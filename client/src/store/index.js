import {applyMidleware } from "redux"
import {configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from '../reducer'
import thunk from 'redux-thunk'


const store = configureStore({ reducer: rootReducer }, composeWithDevTools(applyMidleware(thunk)))