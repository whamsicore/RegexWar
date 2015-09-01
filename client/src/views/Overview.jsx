var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Router = require('react-router');
var Link = Router.Link;

var OverView = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }; 
  },
  render: function() {

    // console.log('TEST----------->');
    var indicateSolved = function(q_id, user){
      try{
        var stats = user.stats; 
        for(var i=0; i<stats.length;i++){
          if(stats[i].q_id === q_id){
            return "Solved!";
          }
        } // for
        return "Unsolved";
      }catch(err){
        return "Unsolved";
      } //try

    }; //indicateSolved()

    // think of propos as immutable within the component, that is, never write to this.props.
    // https://facebook.github.io/react/docs/displaying-data.html
    var questions = this.props.questions.map(function(question) {
      return (
        <tr key={question.qNumber} className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.description}</p></td>
          <td><RaisedButton label="Solve" linkButton="true" params={{qNumber:question.qNumber}} containerElement={<Link to="question"/>}/></td>
          <td><p>{indicateSolved(question.qNumber, this.props.user)}</p></td>
        </tr>
      )
    }.bind(this));

    // Since JSX is JavaScript, identifiers such as class and for are discouraged as XML attribute names. 
    // Instead, React DOM components expect DOM property names like className and htmlFor, respectively.
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    return (
      <div className="panel">
        <div className="panel-body">
        <h2>Choose a challenge</h2>
        <table className="questionContainer table table-hover">
          <tbody>
            {questions}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
});

module.exports = OverView;
