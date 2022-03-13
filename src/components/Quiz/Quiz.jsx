import React from 'react';
import { Link } from 'react-router-dom';
import QuizModel from '../../models/Quiz';
import Button from '../Button/Button';
import './Quiz.css';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quizzes: [],
            currrentIndex: 0,
            numberOfCorrects: 0
        };
    }

    async componentDidMount() {
        await this.restart();
    }

    async restart() {
        this.setState({
            quizzes: [],
            currrentIndex: 0,
            numberOfCorrects: 0
        });

        const quizzes = await QuizModel.fetchAndCreateQuizzes();

        this.setState({ quizzes });
    }

    selectAnswer(quiz, answer) {
        let { currrentIndex, numberOfCorrects } = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if (isCorrect) {
            numberOfCorrects++;
            alert('Correct answer!!!');
        } else {
            alert(`Wrong answer... (The correct answer is "${quiz.correctAnswer}")`);
        }
        currrentIndex++;

        this.setState({
            currrentIndex,
            numberOfCorrects
        });
    }

    render() {
        const { quizzes, currrentIndex } = this.state;

        // 読込中
        if (quizzes.length === 0) {
            return this.renderLoading();
        }
        // クイズ中
        if (quizzes.length > 0 && currrentIndex < quizzes.length) {
            return this.reunderQuiz();
        }

        // クイズ結果
        if (quizzes.length > 0 && currrentIndex >= quizzes.length) {
            return this.renderResult();
        }
    }

    renderLoading() {
        return (
            <div>
                <h1>クイズページ</h1>
                <p>Now loading...</p>
                <hr />
                <Link to="/">トップページへ</Link>
            </div>
        )
    };

    reunderQuiz() {
        const { currrentIndex, quizzes } = this.state;

        const quiz = quizzes[currrentIndex];
        const answers = quiz.shuffleAnswers().map((answer, index) => {
            return (
                <li key={index}>
                    <Button
                        onClickHandler={() => { this.selectAnswer(quiz, answer) }}
                    >
                        {answer}
                    </Button>
                </li>
            );
        });

        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p>{quiz.question}</p>
                    <ul className='QuizList'>{answers}</ul>
                </div>
                <hr />
                <Link to="/">トップページへ</Link>
            </div>
        );
    }
    renderResult() {
        const { quizzes, numberOfCorrects } = this.state;

        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p id="result">{`${numberOfCorrects}/${quizzes.length} corrects.`}</p>
                    <Button
                        onClickHandler={() => { this.restart() }}
                    >
                        Restart
                    </Button>
                </div>
                <hr />
                <Link to="/">トップページへ</Link>
            </div>
        );
    };
};




export default Quiz;