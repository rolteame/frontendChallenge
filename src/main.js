import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Importing components
import Country from './components/Country.vue'

const app =createApp(App)

// Register Components
app.component('country', Country)

app.mount('#app')
