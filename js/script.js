new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],

   //Array filtrato dal catalogo dei film che contiene solo quello che voglio visualizzare
   filteredFilm:[],

   
 },

 methods:{
   // Funzione che fa la chiamata api al click ed esegue la funzione searchFilter()
   apiCall:function(){
     const self = this;
     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.films = resp.data.results;

       self.searchFilter();

       self.searchBar = '';

     })
   },

   // Crea un array con solo le proprietà che mi servono dell'array principale
   searchFilter:function(){
     this.films.forEach((element) => {
       this.filteredFilm.push(
         {
           title:element.title,
           originalTitle:element.original_title,
           originalLanguage:element.original_language,
           vote:element.vote_average
         }

       );
     });

   }

  },
});
Vue.config.devtools = true;
