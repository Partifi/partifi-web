Songs = new Meteor.Collection("songs");

if(Meteor.is_server) {
  Meteor.methods({searchSong: function (query) {
    this.unblock();
    var url = "http://ws.spotify.com/search/1/track.json?q=" + encodeURI(query);
    var result = Meteor.http.get(url);
    if (result.statusCode === 200) {
      eval("var json = " + result.content);
      var tracks = json.tracks;
      var firstTrack = json.tracks[0];
      var requestedSong = {
        name: firstTrack['name'],
        artist: firstTrack['artists'][0]['name'],
        href: firstTrack['href'],
        loves: [ 'username-here-TODO' ] // fixme
      }
      var song = Songs.findOne({href: requestedSong['href']})
      if (song) {
        ///////// TODO: already exists, do something cool //////////
        // loves = song['loves']
        // loves.push('next-username-here-TODO')
        // Songs.update(song._id, {$set: {loves: loves}})
      } else {
        Songs.insert(requestedSong);
      };
      return requestedSong;
    } else {
      return result.content;
    }
    return false;
  }});
};
