<template>
  <section>
    <div v-if="!isDataAvailable" class="error"><p class="error-message">{{error}}</p></div>
    <div v-else class="card" v-for="country,index in countries">
      <img class="card-img" :src="country.flags.png" :alt="country.name.common">
      <p class="country-name">{{country.name.common}}</p>
      <p>Population: {{country.population}}</p>
      <p v-for="name in currency(country.currencies)">Currency: {{name.name}} ({{name.symbol}})</p>
      <p>CCA3: {{country.cca3}}</p>
      <p >Official Language: {{language(country.languages)}}</p>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Country',
    data() {
    return {
      countries: [],
      error: '',
      isDataAvailable: null
    }
  },
  computed: {
    
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/region/africa')
        const data = response.data
        // console.log(data)
        if(data.length > 0) {
          this.isDataAvailable = true
        }
        for(let i = 0; i < data.length; i++) {
          if(i < 5) {
            this.countries.push(data[i])
            
          }
          
        }
        console.log(this.countries)
      }catch(err) {
        this.error = 'Cannot get country details as of now'
        this.isDataAvailable = false
      }
    },
    currency(currency) {
      return Object.keys(currency).map(key => currency[key])
    },
    language(language) {
      for(let key in language) {
        return language[key]
      }
    }
  },
  async mounted() {
    await this.fetchCountries()
  }
  }
</script>

<style scoped>
  section {
    display: flex;
    flex-flow: row wrap;
    width: 80%;
    margin: 0 auto;
  }

  .error {
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    border: 1px solid black;
  }
  .card {
    display: inline-block;
    height: auto;
    width: 25%;
    margin: 20px;
    border: 1px solid #000;
    background-color: #fff;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .card-img {
    height: 200px;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
  }

  .country-name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
  }
</style>