new Vue({
 el: '#app',
 data:{

   // proprietà che si aggancia all'input tramite v-model
   searchBar: '',

   // Array che contiene tutto il catalogo dei film
   films:[],
   tvShows:[],

},

 methods:{
   // Funzione che fa la chiamata api al click ed esegue la funzione searchFilter()
   apiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.films = resp.data.results;
       self.searchBar = '';
     });
     
     self.serieTvApiCall();
   },

   serieTvApiCall:function(){
     const self = this;

     axios.get('https://api.themoviedb.org/3/search/tv?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.tvShows = resp.data.results;
       self.searchBar = '';
       console.log(self.tvShows);
     })
   },

   parseVote:function(voto){
     return parseInt(voto / 2);
   },

 },
});
Vue.config.devtools = true;
