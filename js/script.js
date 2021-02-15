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

   generi:[],

   overview: 'Overview:',

   select:'',

   genresList:[],

   trendingFilms:[],

   generalResults:[],

   visible: true,

   apiKey:'427d996ca0a65b440bcbfd1d8ce45126',



},

 methods:{
   // Funzione che fa la chiamata api per i film e le serie tv
   apiCall:function(){
     this.generalResults = [];
     this.filmsApiCall();
     this.serieTvApiCall();



   },

   //Funzione che fa la chiamata per i films
   filmsApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie',{
       params:{
         api_key:this.apiKey,
         query: this.searchBar,
         language: 'it-IT-en-EN',
       },
     })
     .then(function(resp){
       self.films = resp.data.results;
       self.generalResults = [...self.generalResults, ...self.films];
       self.searchBar = '';

       // console.log(self.films);
     });
   },



   // Funzione che fa la chiamata api per le serie tv
   serieTvApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/tv',{
       params:{
         api_key:this.apiKey,
         query:this.searchBar,
         language: 'it-IT-en-EN',
       },

     })
     .then(function(resp){
       self.tvShows = resp.data.results;
       self.generalResults = [...self.generalResults, ...self.tvShows];
       self.searchBar = '';

     })
   },

   //Funzione che fa la chiamata per il cast
   castMovieApiCall:function(id){
     const self = this;
       return axios.get('https://api.themoviedb.org/3/movie/'+ id + '/credits',{
         params:{
           api_key:this.apiKey,

         },
       })
       .then(function(resp){
         self.credits = resp.data.cast.slice(0,5);
       });
     },

     //Richiama i generi delle serie tv
     castTvApiCall:function(id){
       const self = this;
         return axios.get('https://api.themoviedb.org/3/tv/'+ id + '/credits',{
           params:{
             api_key:this.apiKey,

           },
         })
         .then(function(resp){
           self.credits = resp.data.cast.slice(0,5);
         });
     },

     //Richiama i generi dei film
     genresApiCallMovie:function(){
       const self = this;
         return axios.get('https://api.themoviedb.org/3/genre/movie/list',{
           params:{
             api_key:this.apiKey,

           },
         })
         .then(function(resp){
           self.generi = resp.data.genres;


         });
     },

     // Funzione che richiama i generi delle serie
     genresApiCallTv:function(){
       const self = this;
         return axios.get('https://api.themoviedb.org/3/genre/tv/list',{
           params:{
             api_key:this.apiKey,

           },
         })
         .then(function(resp){
           self.generi = resp.data.genres;


         });
     },

     //Funzione che assegna ad ogni serie/film i suoi generi
     giveGenres:function(movie, id){
       return movie.includes(id);
     },



   // Funzione che parsa il voto e lo divide per due
   parseVote:function(voto){
     return parseInt(voto / 2);
   },

   //Funzione che nasconde il titolo originale se è uguale al titolo
   hideOriginalTitle:function(originalTitle, title ){
     return originalTitle !== title;
   },

   //Funzione che nasconde la dicitura film e serie tv se l'array che li riguarda è a zero
   hideKindVideo:function(array){
     return array.length !== 0;
   },

   //Funzione che mostra le stringhe solo se il loro contenuto non è vuoto
   hideString:function(element){
     return element !== '';
   },

   // Funzione che inserisce le copertine nei film e ne mette una di default se non trova niente
   backgroundMovie: function(film) {

     if(film.poster_path !== null) {
       return {
          backgroundImage: 'url(' + this.posterSize + film.poster_path + ')'
         }
     }

     return {
       backgroundImage: 'url(img/ciak.jpg)'
     }

   },

   // Funzione che inserisce le copertine nelle serie e ne mette una di default se non trova niente
   backgroundSerieTv: function(serie) {

     if(serie.poster_path !== null) {
       return {
          backgroundImage: 'url(' + this.posterSize + serie.poster_path + ')'
         }
     }

     return {
       backgroundImage: 'url(img/serie-tv.jpg)'
     }
   },

   //Inserisce i generi in un array
   genresListGenerator:function(){
     this.generi.forEach((element) => {
       if(!this.genresList.includes(element.name)){
         this.genresList.push(element.name);
         console.log(this.genresList);
       }
     });

   },

   // selectByGenre:function(array){
   //   return array.toLowerCase()===this.select || this.select === '';
   // }

},

 mounted(){
   const self = this;

   axios.get('https://api.themoviedb.org/3/trending/all/week',{
     params:{
       api_key:this.apiKey,
       query: 'Kill Bill',
       language: 'it-IT-en-EN',
     },
   })
   .then(function(resp){
     self.trendingFilms = resp.data.results;
     self.generalResults = [...self.generalResults, ...self.trendingFilms];


   });
 }
});
Vue.config.devtools = true;
