import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './Assessment.css';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import Button from '../../components/Button/Button';
import Score from '../../components/Score/Score';


const assessment = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Mail Links", "Hyper Text Markup Language", "Hand Text Mail Language", "Hand Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which tag is used for starting the body of HTML?",
        options: ["<body>", "<b>", "<bd>", "<br>"],
        answer: "<body>"
    },
    {
        question: "Choose the correct HTML element for largest heading.",
        options: ["<heading>", "<h.1>", "<h-1>", "<h1>"],
        answer: "<h1>"
    },
    {
        question: "Choose the correct HTML element for starting the paragraph.",
        options: ["<p>", "<para>", "<pg>", "<p1>"],
        answer: "<p>"
    },
    {
        question: "Choose the correct HTML element for breaking the line.",
        options: ["<b.r \>", "<break />", "<br />", "<br \>"],
        answer: "<br />"
    }
];


class Assessment extends Component{
    state = {
        isSubmit: false
    }

    componentDidMount(){
        this.props.onNextQuestion();
    }

    onPrevButtonHandler = () => {
        this.props.onPrevQuestion();
    }

    onNextButtonHandler = () => {
        this.props.onNextQuestion();
    }

    onSubmitQuizHandler = () => {
        this.setState({isSubmit: true});
    }

    getScore = () => {
        let score = 0;
        assessment.forEach( (questionObj, index) => {
            if(questionObj.answer === this.props.answersInfo[index]){
                score++;
            }
        });
        return score;
    }

    render(){
        let nextButton = <Button clicked={this.onNextButtonHandler}>NEXT</Button>
        if(this.props.currentIndex === 4){
            nextButton = <Button clicked={this.onSubmitQuizHandler}>SUBMIT</Button>            
        }

        let assessmentObj = (
            <div className={classes.Assessment}>
                <QuestionContainer 
                    assessment = {assessment}
                    answersInfo = {this.props.answersInfo}
                    setResultAnswer={this.props.setResultAnswer}
                    questionIndex={this.props.currentIndex}
                /> 
                <div className={classes['buttonBar']}>
                    <div className={classes.Prevbtn}>
                        { this.props.currentIndex > 0 ? <Button clicked={this.onPrevButtonHandler}>PREV</Button> : null }
                    </div>
                    <div className={classes.Nextbtn}>
                        { nextButton }
                    </div>  
                </div>
            </div>
        );

        if(this.state.isSubmit){
            const score = this.getScore();
            assessmentObj = <Score score={score}/>
        }

        return(
            <div>
                {assessmentObj}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentIndex: state.questions.selectedQuestion,
        answersInfo: state.answers.answersInfo
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onNextQuestion: () => dispatch(actionCreators.nextQuestion()),
        onPrevQuestion: () => dispatch(actionCreators.prevQuestion()),
        setResultAnswer: (data) => dispatch(actionCreators.setAnswer(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);