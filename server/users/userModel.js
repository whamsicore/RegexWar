var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    url: {type: String, default: 'unknown'},
    location: {type: String, default: 'unknown'},
    aboutMe: {type: String, default: 'unknown'},
    tagline: {type: String, default: 'unknown'},
    profileCover: {type: String, default: 'unknown'},
    profileImage: {type: String, default: 'unknown'},
  },

  score: {type: Number, default:0},

  stats: [{
      question: String, 
      score: Number, 
      time: Number, 
      timestamp: String
    }],

  submittedQuestions: [{qNumder: {type: Number}, title: {type: String}}],

  // format is intended to be: { <qNumber>: "solution string", ...}
  // entries will only exist for a question that the user has solved.
  // Note: Using a mixed type requires calling User.markModified('questionState')
  // before User.save();
  // questionState: mongoose.Schema.Types.Mixed 
});

var User = mongoose.model('User', UserSchema);

// var info = { 
//     "__v" : 0, "_id" : ObjectId("55d691769ca9a07379c68799"), 
//     "google" : { 
//       "name" : "John Andersen", 
//       "token" : "ya29.1gGmDQTNOCGdwAluJIWrClZ7a2hfXE7fk68WrIbB6GZAVKQkpDbni1NfacAyJqn2BhHb4Q", 
//       "id" : "112166762536027278167", 
//       "profileImage" : "unknown", 
//       "profileCover" : "unknown", 
//       "location" : "planet earth", 
//       "url" : "https://plus.google.com/112166762536027278167" 
//     }, 
//     "score" : 0, 
//     "stats" : [], 
//     "submittedQuestions" : [ [33, 'hello world'], [45, 'jump'] ] 
//   }

module.exports = User;
