import React, { Component } from 'react';
import $ from 'jquery';
/*import logo from './logo.svg';*/
import './App.css';

class DescriptionBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>{this.props.description}</p>
  }
}

class SelectionsBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var selection_type = this.props.remark === '1' ? 'checkbox' : 'radio';
    var selection_name = this.props.reamrk === '1' ? 'choose_mul' : 'choose_one'
    return (
      <form>
        <fieldset>
          <input name={selection_name} type={selection_type} id={this.props.id+'_A'} value='A' /><label htmlFor={this.props.id+'_A'}>{this.props.answerA}</label><br />
          <input name={selection_name}  type={selection_type} id={this.props.id+'_B'} value='B' /><label htmlFor={this.props.id+'_B'}>{this.props.answerB}</label><br />
          {this.props.answerC === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_C'} value='C' /><label htmlFor={this.props.id+'_C'}>{this.props.answerC}</label><br /></span>)}
          {this.props.answerD === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_D'} value='D' /><label htmlFor={this.props.id+'_D'}>{this.props.answerD}</label><br /></span>)}
          {this.props.answerE === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_E'} value='E' /><label htmlFor={this.props.id+'_E'}>{this.props.answerE}</label><br /></span>)}
        </fieldset>
      </form>
    )
  }
}

class SubmitBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
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
            remark={this.props.question.remark}
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
      questions.push(<div><QuestionBar className="box effect8" key={question.id} question={question} /></div>)
    })
    return <div>{questions}<SubmitBar /></div>
  }
}

export default App;
