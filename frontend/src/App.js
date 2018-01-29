import React, { Component } from 'react';
import $ from 'jquery';
/*import logo from './logo.svg';*/
import './App.css';

class DescriptionBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>{this.props.description}</p>
    )
  }
}

class SelectionsBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if ((this.props.remark=='2')||(this.props.remark=='0')) {
      var selections = [];
      selections.push('<form><fieldset>');
      selections.push('<input type="radio" id={this.props.id} value="A" />{this.props.A}<br />');
      selections.push('<input type="radio" id={this.props.id} value="B" />{this.props.B}');
      if (this.props.C !== ''){
        selections.push('<br /><input type="radio" id={this.props.id} value="C" />{this.props.C}')
      }
      if (this.props.D !== ''){
        selections.push('<br /><input type="radio" id={this.props.id} value="D" />{this.props.D}')
      }
      if (this.props.E !== ''){
        selections.push('<br /><input type="radio" id={this.props.id} value="E" />{this.props.E}')
      }
      selections.push('</fieldset></form>')
      return ({selections})
    } else {
      var selections = [];
      selections.push('<form><fieldset>');
      selections.push('<input type="checkbox" id={this.props.id} value="A">{this.props.A}<br />');
      selections.push('<input type="checkbox" id={this.props.id} value="B">{this.props.B}');
      if (this.props.C !== ''){
        selections.push('<br /><input type="checkbox" id={this.props.id} value="C" />{this.props.C}')
      }
      if (this.props.D !== ''){
        selections.push('<br /><input type="checkbox" id={this.props.id} value="D" />{this.props.D}')
      }
      if (this.props.E !== ''){
        selections.push('<br /><input type="checkbox" id={this.props.id} value="E" />{this.props.E}')
      }
      selections.push('</fieldset></form>');
      return ({selections})
    }
  }
}

class SubmitBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form>
        <button type="submit" onClick={this.props.handleCheckClick} >{this.props.answered?'再来一次':'检查'}</button>
      </form>
    )
  }
}

class QuestionBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <DescriptionBar description={this.props.question.description} />
        <SelectionsBar
            id={this.props.question.id}
            answer={this.props.question.answer}
            answerA={this.props.question.A}
            answerB={this.props.question.B}
            answerC={this.props.question.C}
            answerD={this.props.question.D}
            answerE={this.props.question.E}
            remark={this.props.remark}
          />
        </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      current_questions: [],
      answered: false,
    }
  }
  componentDidMount() {
    var that = this;
    const url = 'http://localhost:3000/data/';
    $(function(){$.ajax({
      headers: {
        'Content-Type': 'application/json',
      },
      url: url,
      type: "GET",
      dataType: "json",
      data: {},
      success: function(result) {
        that.setState({questions:result,current_questions:result,})
      },
      error: function(xhr, status, err) {
        console.log(err.Message);
      },
    })})
  }
  render() {
    var questions = [];
    this.state.current_questions.forEach((question)=>{
      questions.push('<div><QuestionBar question={question} /></div>')
    })
    return (
      <div>
        {questions}
        <SubmitBar />
      </div>
    );
  }
}

export default App;
