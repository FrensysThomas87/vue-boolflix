new Vue({
 el: '#app',
 data:{
   searchBar: '',
   films:[],
 },

 methods:{
   apiCall:function(){
     const self = this;
     axios.get('https://api.themoviedb.org/3/search/movie?api_key=427d996ca0a65b440bcbfd1d8ce45126&query= ' + this.searchBar)
     .then(function(resp){
       self.films = resp.data.results;
       console.log(self.films);
     })
   },

   // searchFilter:function(){
   //   self.films.forEach((element) => {
   //
   //   });
   //
   // }

  },
});
Vue.config.devtools = true;
