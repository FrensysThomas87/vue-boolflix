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

   creditsFiltered:[],



},

 methods:{
   // Funzione che fa la chiamata api per i film e le serie tv
   apiCall:function(){
     this.filmsApiCall();
     this.serieTvApiCall();


   },

   //Funzione che fa la chiamata per i films
   filmsApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie',{
       params:{
         api_key:'427d996ca0a65b440bcbfd1d8ce45126',
         query: this.searchBar,
         language: 'it-IT-en-EN',
       },
     })
     .then(function(resp){
       self.films = resp.data.results;

       self.searchBar = '';

       // console.log(self.films);
     });
   },



   // Funzione che fa la chiamata api per le serie tv
   serieTvApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/tv',{
       params:{
         api_key:'427d996ca0a65b440bcbfd1d8ce45126',
         query:this.searchBar,
         language: 'it-IT-en-EN',
       },

     })
     .then(function(resp){
       self.tvShows = resp.data.results;
       self.searchBar = '';

     })
   },

   //Funzione che fa la chiamata per il cast
   castApiCall:function(id){
     const self = this;
       return axios.get('https://api.themoviedb.org/3/movie/'+ id + '/credits',{
         params:{
           api_key:'427d996ca0a65b440bcbfd1d8ce45126',

         },
       })
       .then(function(resp){
         self.credits = resp.data.cast
       });
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
   hideKindVideo:function(kind){
     return kind.length !== 0;
   },

   hideIfEqualZero:function(element){
     return element.length === 0;
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
},

 mounted(){
   const self = this;

   axios.get('https://api.themoviedb.org/3/search/movie',{
     params:{
       api_key:'427d996ca0a65b440bcbfd1d8ce45126',
       query: 'Kill Bill',
       language: 'it-IT-en-EN',
     },
   })
   .then(function(resp){
     self.films = resp.data.results;

   });
 }
});
Vue.config.devtools = true;
