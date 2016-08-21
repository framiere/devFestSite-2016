/* eslint-disable */
var speakerId = getUrlParameter('id');

var speakerVue = new Vue({
  el: '#speakerVue',
  data: {
    agenda: null,
    sessions: null,
    speaker: null,
    favorites: []
  },
  ready: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/devfest.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        // get agenda
        self.agenda = json.agenda;
        // get speaker
        var speaker = json.speakers.filter(function(s) {
          return s.id === parseInt(speakerId);
        })[0];
        self.speaker = speaker;
        // get sessions
        if (speaker) {
          self.sessions = json.sessions.filter(function(session) {
            return session.speakers && session.speakers.indexOf(parseInt(speakerId)) !== -1
          });
        }
      });
      self.favorites = JSON.parse(localStorage['fav']) || []
      //fetch('api/v1/stars/get?login=ben').then(function(response) {
      //  return response.json();
      //}).then(function(json) {
      //  self.favorites = json.favs;
      //});
    },
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    isFavorite: isFavorite
  },
  events: {
    'toggle-favorite': function(id, favorite) {
      toggleFavorite(id, favorite, this.favorites)
    }
  }
});
