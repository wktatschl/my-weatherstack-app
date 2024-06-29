<template>
  <div class="cover-container d-flex w-100 h-100 p-4 mx-auto flex-column">
    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
      <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme">
        <i class="bi bi-circle-half"></i>
        <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
        <li v-for="mode in ['light', 'dark', 'auto']" :key="mode">
          <button
            type="button"
            class="dropdown-item d-flex align-items-center"
            :class="{ active: theme === mode }"
            @click="toggleTheme(mode)"
            :aria-pressed="theme === mode"
          >
            <svg class="bi me-2 opacity-50" width="1em" height="1em">
              <use href="#circle-half"></use>
            </svg>
            {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
            <svg v-if="theme === mode" class="bi ms-auto" width="1em" height="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <div class="px-3">
      <h1 class="mt-5">Mon app Weatherstack</h1>
      <p class="lead">Recherchez par ville pour trouver les informations météorologiques actuelles.</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="input-group search-bar">
            <input v-model="city" type="text" id="cityInput" class="form-control" placeholder="Saisir le nom d'une ville" @keyup.enter="getWeather">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" id="searchButton" @click="getWeather">Rechercher</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="weatherCard card mx-auto my-1 p-4" v-if="weather">
      <div class="card-body">
        <img v-if="weather.iconUrl" :src="weather.iconUrl" :alt="weather.description" class="mx-auto rounded" style="height: 11rem">
        <h3 class="card-title mt-3">{{ weather.cityName }}</h3>
        <p class="card-text">{{ weather.temperature }}°C - {{ weather.description }}</p>
        <a v-if="weather.detailsUrl" :href="weather.detailsUrl" class="card-link" target="_blank">Voir les détails</a>
      </div>
    </div>

    <div v-else-if="loading" class="text-center my-5">
      <p>Chargement...</p>
    </div>

    <div v-else class="text-center my-5">
      <p>Aucune donnée météorologique disponible</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchWeather } from '../services/WeatherService';
import { Weather } from '../models/WeatherModel';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default defineComponent({
  name: 'WeatherView',
  setup() {
    const city = ref('');
    const weather = ref<Weather | null>(null);
    const loading = ref(false);
    const theme = ref('light');

    const getWeather = async () => {
      loading.value = true;
      try {
        if (city.value) {
          weather.value = await fetchWeather(city.value);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        loading.value = false;
      }
    };

    const toggleTheme = (selectedTheme: string) => {
    
        if (selectedTheme === 'auto') {
            selectedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        theme.value = selectedTheme;
        document.documentElement.setAttribute('data-bs-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      toggleTheme(savedTheme);
    });

    return { city, weather, loading, getWeather, theme, toggleTheme };
  },
});
</script>

<style scoped>

    .weatherCard {
        border: none;
    }

</style>
