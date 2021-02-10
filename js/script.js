new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],

   //Array filtrato dal catalogo dei film che contiene solo quello che voglio visualizzare
   filteredFilm:[],

   emptyArray:[],
 },

 methods:{
   // Funzione che fa la chiamata api al click ed esegue la funzione searchFilter()
   apiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){

       self.films = resp.data.results;
       self.transformVote();
       self.searchFilter();

       self.searchBar = '';
       console.log(self.filteredFilm);

     })
   },

   // Crea un array con solo le proprietà che mi servono dell'array principale
   searchFilter:function(){
     this.films.forEach((element) => {
       const voteParsed = parseInt(element.vote_average);
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

   transformVote:function(){
     this.films.forEach((element) => {

       switch (element.vote_average) {
        case 0:
        element.vote_average = 0;
        break;

        case 1:
        element.vote_average = 1;
        break;

        case 2:
        element.vote_average = 2;
        break;

        case 3:
        element.vote_average = 3;
        break;

        case 4:
        element.vote_average = 4;
        break;

        case 5:
        element.vote_average = 5;
        break;

        case 6:
        element.vote_average = 5;
        break;

        case 7:
        element.vote_average = 5;
        break;

        case 8:
        element.vote_average = 5;
        break;

        case 9:
        element.vote_average = 5;
        break;

        case 10:
        element.vote_average = 5;
        break;

        default :
        element.vote_average = 5;
       }
     });


   }


 },
});
Vue.config.devtools = true;
