new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],

   // Array che contiene tutto il catalogo delle serie tv
   tvShows:[],

   posterSize: 'http://image.tmdb.org/t/p/w500/',

   logo: './img/frankflix.png'
},

 methods:{
   // Funzione che fa la chiamata api per i flim al click ed esegue la funzione che fa la chiamata api per le serie tv
   apiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.films = resp.data.results;
       self.searchBar = '';
     });

     self.serieTvApiCall();
   },


   // Funzione che fa la chiamata api per le serie tv
   serieTvApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/tv?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.tvShows = resp.data.results;
       self.searchBar = '';
       console.log(self.tvShows);
     })
   },

   // Funzione che parsa il voto e lo divide per due
   parseVote:function(voto){
     return parseInt(voto / 2);
   },

 },
});
Vue.config.devtools = true;
