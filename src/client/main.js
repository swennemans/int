import { createApp } from 'mantra-core'
import { combineReducers } from 'redux'
import initContext from './configs/context.js'

// modules
import _homeModule from './modules/_home/index.js'
import _layoutModule from './modules/_layout/index.js'
import sideMenuModule from './modules/sidemenu/index.js'
import _usersModule from './modules/_users/index.js'
import kennisCentrumModule from './modules/kenniscentrum/index.js'
import contactenModule from './modules/contacten/index.js'
import profielModule from './modules/profiel/index.js'
import snackbarModule from './modules/snackbar/index.js'

//reducers
import { kennisCentrumReducer } from './modules/kenniscentrum/actions/files.js'
import { layoutReducer } from './modules/_layout/actions/layout.js'
import { contactsReducer } from './modules/contacten/actions/contacten'
import { contactsSearchReducer } from './modules/contacten/actions/search'
import { profileReducer } from './modules/profiel/actions/profiel'
import { favorietenReducer } from './modules/favorieten/actions/favorieten'
import { snackbarReducer } from './modules/snackbar/actions/snackbar'

const rootReducer = combineReducers({
  snackbarReducer,
  favorietenReducer,
  kennisCentrumReducer,
  layoutReducer,
  contactsReducer,
  contactsSearchReducer,
  profileReducer
})
//main styles //
//require('./style.import.css')

import './style.css'

// init context
const context = initContext(rootReducer)

//create app
const app = createApp(context)
app.loadModule(snackbarModule)
app.loadModule(_layoutModule)
app.loadModule(contactenModule)
app.loadModule(sideMenuModule)
app.loadModule(_homeModule)
app.loadModule(profielModule)
app.loadModule(_usersModule)
app.loadModule(kennisCentrumModule)


app.init()
