new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],

   //Array filtrato dal catalogo dei film che contiene solo quello che voglio visualizzare
   filteredFilm:[],



   lightStars:['far fa-star'],

   fullStars: ['fas fa-star'],

   stars:5,

 },

 methods:{
   // Funzione che fa la chiamata api al click ed esegue la funzione searchFilter()
   apiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){

       self.films = resp.data.results;

       self.searchFilter();
       // self.printStars();

       self.searchBar = '';
       console.log(self.filteredFilm);

     })
   },

   // Crea un array con solo le proprietà che mi servono dell'array principale
   searchFilter:function(){
     this.films.forEach((element) => {
       const voteParsed = parseInt(element.vote_average / 2);
       this.filteredFilm.push(
         {
           title:element.title,
           originalTitle:element.original_title,
           originalLanguage:element.original_language,
           vote:voteParsed,

         }
       );
     });
   },

   // printStars:function(){
   //   this.films.forEach((element) => {
   //     if(element.vote_average > 0){
   //       this.fullStars.length = element.vote_average;
   //     }else{
   //       this.emptyStars.length = element.vote_average;
   //     }
   //   });
   //
   // },



 },
});
Vue.config.devtools = true;
