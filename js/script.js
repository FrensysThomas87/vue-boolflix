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

   posterSizeBig: 'http://image.tmdb.org/t/p/w780/',

   logo: './img/frankflix.png',

   noResults: 'La ricerca non ha prodotto risultati',

   // Oggetto che contiene gli attori
   credits:[],

   //Oggetto che contiene i generi
   generi:[],

   overview: 'Overview:',

   select:'',

   //Lista dei generi che riempie la select
   genresList:[],

   //Array che contiene i trending films
   trendingFilms:[],




   //Array che contiene i trending tv shows
   trendingTv:[],



   visible: true,

   apiKey:'427d996ca0a65b440bcbfd1d8ce45126',

   //Array che contiene l'insieme dei trending films e dei films
   generalResult:[],

   //Array che contiene l'insieme dei trending tvShows e dei tvShows
   generalResultTv:[],

   activeIndex:0,

   serieIndex:0,

   posterSerieVisible: false,

   posterFilmVisible: true,

   searchVisible: false,


},

 methods:{
   // Funzione che fa la chiamata api per i film e le serie tv
   apiCall:function(){

     this.generalResult = [];
     this.generalResultTv = [];
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
       self.generalResult = [...self.generalResult,...self.films];
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

       self.generalResultTv = [...self.generalResultTv, ...self.tvShows];
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

     // Controlla se gli a
     checkArrayEmpty:function(array1, array2){
       return array1.length === 0 && array2.length === 0;
     },

     //funzione che rende visibile la barra di ricerca
     inputVisible:function(){
       this.searchVisible = true;
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
   hideKindVideo:function(array, array2){
     return array.length !== 0 && array2.length !== 0;
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

   // Funzione che restiuisce l'immagine grande di copertina dei films
   insertBigPosterFilm:function(film){
     if(this.generalResult.length)
     return{
       backgroundImage: 'url(' + this.posterSizeBig + film[this.activeIndex].backdrop_path +   ')'
     }

   },

   //Funzione che restiuisce l'immagine grande di copertina dei films
   // insertBigPosterFilm:function(film){
   //   return this.posterSizeBig + film[this.activeIndex].poste_path;
   //
   //
   // },

   // Funzione che restituisce l'immagine grande di copertina delle serie
   insertBigPosterSerie:function(tv){
     console.log(tv);
     return{
        backgroundImage: 'url(' + this.posterSizeBig + tv[this.serieIndex].backdrop_path +   ')'

     }

   },







   // Funzione che mostra i big poster dei films
   showBigPosterFilm:function(index){
     this.activeIndex = index;
     this.posterFilmVisible = true;
     this.posterSerieVisible = false;
     console.log(this.activeIndex);
   },

   // Funzione che mostra i big poster deLLE serie
   showBigPosterTv:function(i){
     this.serieIndex= i;
     this.posterFilmVisible = false;
     this.posterSerieVisible = true;
     console.log(this.activeIndex);
   },

   //Funzione che nasconde i big poster
   hidePoster:function(visibility,film, serie,){
     return visibility === true && film.length === 0 && serie.length === 0
   },





   // selectByGenre:function(array){
   //   return array.toLowerCase()===this.select || this.select === '';
   // }

},

 mounted(){
   const self = this;

   axios.get('https://api.themoviedb.org/3/trending/movie/week',{
     params:{
       api_key:this.apiKey,

       language: 'it-IT-en-EN',
     },
   })
   .then(function(resp){
     self.trendingFilms = resp.data.results;
     self.generalResult = [...self.generalResult,...self.trendingFilms];



   });

   axios.get('https://api.themoviedb.org/3/trending/tv/week',{
     params:{
       api_key:this.apiKey,

       language: 'it-IT-en-EN',
     },
   })
   .then(function(resp){
     self.trendingTv = resp.data.results;
     self.generalResultTv = [...self.generalResultTv,...self.trendingTv];



   });
 }
});
Vue.config.devtools = true;
