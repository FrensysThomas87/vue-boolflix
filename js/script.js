new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],

   // Array che contiene tutto il catalogo delle serie tv
   tvShows:[],

   posterSize: 'http://image.tmdb.org/t/p/w342/',

   logo: './img/frankflix.png',

   noResults: 'La ricerca non ha prodotto risultati',

   credits:[],
},

 methods:{
   // Funzione che fa la chiamata api per i film e le serie tv
   apiCall:function(){
     this.filmsApiCall();
     this.serieTvApiCall();
     this.castApiCall();
   },

   //Funzione che fa la chiamata per i films
   filmsApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie',{
       params:{
         api_key:'427d996ca0a65b440bcbfd1d8ce45126',
         query: this.searchBar,
       },
     })
     .then(function(resp){
       self.films = resp.data.results;
       self.searchBar = '';
     });
   },



   // Funzione che fa la chiamata api per le serie tv
   serieTvApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/tv',{
       params:{
         api_key:'427d996ca0a65b440bcbfd1d8ce45126',
         query:this.searchBar,
       },

     })
     .then(function(resp){
       self.tvShows = resp.data.results;
       self.searchBar = '';

     })
   },

   //Funzione che fa la chiamata per il cast
   castApiCall:function(){
     const self = this;
     this.films.forEach((element) => {
       axios.get('https://api.themoviedb.org/3/movie/'+ element.id + '/credits?api_key=427d996ca0a65b440bcbfd1d8ce45126')
       .then(function(resp){
         self.credits = resp.data.cast;
         self.searchBar = '';
         console.log(self.credits);
       })
     });


   },

   // Funzione che parsa il voto e lo divide per due
   parseVote:function(voto){
     return parseInt(voto / 2);
   },

   hideOriginalTitle:function(originalTitle, title ){
     return originalTitle !== title;
   }

 },
});
Vue.config.devtools = true;
