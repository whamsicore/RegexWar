var User = require('./userModel');

var userInfo = function(req, res, next){
  console.log(req.user);
  User.find().exec(function(err, data){
    if(err)
      res.status(500, err);
    else
      res.json(req.user);
  })
};


// var data = {
//     u_id: user._id,
//     q_id: this.props.params.qNumber,
//     solution: this.state.result,
//     time: this.state.elapsed
//   }; //data formate

var newSolution = function(req, res){
  console.log("TEST inside newSolution()")
  var str = '';
  
  req.on('data', function(chunk){
    str += chunk;
  });

  req.on('end', function(){
    data = JSON.parse(str);

    var u_id = data.u_id;
    var q_id = data.q_id;
    var solution = data.solution;
    var q_title = data.q_title;
    var time = data.time;
    
    var length = solution.length;
    var score = Math.floor(50-(time-25)*30/25-(length-10)*30/15); //copy in DetailView


    User.findOne({_id:u_id}, function(err, person){
      //update stat:
      console.log("TEST inside update stats", person.stats);
      
      var newStat = {
        q_id: q_id,
        q_title: q_title,
        solution: solution,
        score:score,
        time: time
        // timestamp: new Date()
      }; //newStat

      person.score = person.score+score; 
      person.save();
      console.log("user update successful");
      
      User.update({_id:u_id}, {$push: {stats: newStat}}, function(){
        console.log("Update successful");
      }); 
      
    }); // update user

    // var user = User.find({_id:u_id}).exec(function(person){
    //   console.log("found user");

    //   person.
    // });
    // console.log('TEST inside userController->newSolution. data=', data);
  	
  }); //req.end
  
  res.end();
}; //newSolution()

module.exports = {
  userInfo : userInfo,
  newSolution: newSolution
};