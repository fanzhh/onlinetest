import React, { Component } from 'react';
import $ from 'jquery';
/*import logo from './logo.svg';*/
import './App.css';

class DescriptionBar extends Component {
  render() {
    return <p>{this.props.description}</p>
  }
}

class SelectionsBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event)
  }
  render() {
    var selection_type = this.props.remark === '1' ? 'checkbox' : 'radio';
    var selection_name = this.props.reamrk === '1' ? 'choose_mul' : 'choose_one'
    return (
      <form>
        <fieldset>
          <input name={selection_name} type={selection_type} id={this.props.id+'_A'} value='A' onChange={this.handleChange} /><label htmlFor={this.props.id+'_A'}>{this.props.answerA}</label><br />
          <input name={selection_name}  type={selection_type} id={this.props.id+'_B'} value='B'  onChange={this.handleChange} /><label htmlFor={this.props.id+'_B'}>{this.props.answerB}</label><br />
          {this.props.answerC === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_C'} value='C'  onChange={this.handleChange} /><label htmlFor={this.props.id+'_C'}>{this.props.answerC}</label><br /></span>)}
          {this.props.answerD === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_D'} value='D'  onChange={this.handleChange} /><label htmlFor={this.props.id+'_D'}>{this.props.answerD}</label><br /></span>)}
          {this.props.answerE === '' ? '' : (<span><input name={selection_name}  type={selection_type} id={this.props.id+'_E'} value='E'  onChange={this.handleChange} /><label htmlFor={this.props.id+'_E'}>{this.props.answerE}</label><br /></span>)}
        </fieldset>
      </form>
    )
  }
}

class SubmitBar extends Component {
  constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }
  onClick(event) {
    this.props.onClick(event)
  }
  render() {
    return(
      <form>
        <button type="submit" onClick={this.onClick} >{this.props.answered?'再做一遍错题':'检查'}</button>
      </form>
    )
  }
}

class QuestionBar extends Component {
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
            onChange={this.props.onChange}
          />
          {this.props.answered ? (this.props.question.answer===this.props.answer.answer? ('') : (<p  style={{"color":"red"}}>正确答案：{this.props.question.answer}</p>) ) : ('')}
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
      answers: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
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
        that.setState({questions:result,current_questions:result,});
        var answers = [];
        result.forEach((r)=>{
          answers.push({'id':r.id,'answer':''})
        });
        that.setState({answers:answers,});
      },
      error: function(xhr, status, err) {
        console.log(err.Message);
      },
    })})
  }
  handleChange(event) {
    const id = parseInt(event.target.id.split('_')[0],0);
    const selection = event.target.id.split('_')[1];
    const type = event.target.type;
    var answers = this.state.answers;
    if (type==='radio') {
      answers.find(answer=>answer.id===id).answer = selection;
    } else {
      if (event.target.checked) {
        if (!answers.find(answer=>answer.id===id).answer.includes(selection)){
          var tmp = answers.find(answer=>answer.id===id).answer + selection;
          tmp = tmp.split('').sort().join('');
          answers.find(answer=>answer.id===id).answer = tmp;
        }
      } else {
        if (answers.find(answer=>answer.id===id).answer.includes(selection)){
          answers.find(answer=>answer.id===id).answer = answers.find(answer=>answer.id===id).answer.replace(selection,'')
        }
      }
    }
    this.setState({answers:answers,})
  }
  handleCheckClick(event) {
    event.preventDefault();
    if (event.target.innerHTML==='检查') {
      this.setState({answered:true,});
    } else {
      var current_questions = [];
      var answers = [];
      this.state.current_questions.forEach((question)=> {
        if (this.state.answers.find(answer=>answer.id===question.id).answer!==question.answer) {
          current_questions.push(question);
          answers.push({'id':question.id,'answer':''})
        }
      });
      this.setState({current_questions:current_questions,answers:answers,answered:false,})
    }
  }
  render() {
    var questions = [];
    this.state.current_questions.forEach((question)=>{
      questions.push(<div className="box effect2"><QuestionBar key={question.id} question={question} answer={this.state.answers.find(answer=>answer.id===question.id)} answered={this.state.answered} onChange={this.handleChange} /></div>)
    })
    return <div><div>{questions}</div><div className="box effect2"><SubmitBar answered={this.state.answered} onClick={this.handleCheckClick} /></div></div>
  }
}

export default App;
