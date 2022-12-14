<template>
  <section>
    <div class="card" v-for="country,index in countries">
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
      error: ''
    }
  },
  computed: {
    
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/region/africa')
        this.countries = response.data
      }catch(err) {
        this.error = err.message
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
    flex-flow: wrap;
    justify-content: center;
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
  }
</style>