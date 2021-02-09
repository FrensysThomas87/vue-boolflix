new Vue({
 el: '#app',
 data:{
   searchBar: '',
   films:[],
   filteredFilm:[],
 },

 methods:{
   apiCall:function(){
     const self = this;
     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.films = resp.data.results;

       self.searchFilter();
       console.log(self.filteredFilm);
     })
   },

   searchFilter:function(){
     this.films.forEach((element) => {
       this.filteredFilm.push({title:element.title,
         originalTitle:element.original_title,
         originalLanguage:element.original_language,
         vote:element.vote_average});
     });

   }

  },
});
Vue.config.devtools = true;
