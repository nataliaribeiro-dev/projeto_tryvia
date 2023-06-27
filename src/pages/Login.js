import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAction, setNameAction, resetPlayerAction } from '../redux/actions/index';
import { fetchTokenFromAPI } from '../services/triviaAPI';
import question from '../images/question.svg';
import question1 from '../images/question1.svg';
import question3 from '../images/question3.svg';
import question4 from '../images/question4.svg';
import trivia from '../images/quiz.png';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    localStorage.removeItem('token');
    dispatch(resetPlayerAction());
  }

  validateLogin = () => {
    const { email, name } = this.state;
    const isEmailValid = email.length > 0;
    const isNameValid = name.length > 0;
    const isLoginValid = isEmailValid && isNameValid;
    const isDisabled = !isLoginValid;

    this.setState({
      isDisabled,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.validateLogin();
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, name } = this.state;
    const { history, dispatch } = this.props;
    const token = await fetchTokenFromAPI();

    dispatch(setEmailAction(email));
    dispatch(setNameAction(name));
    localStorage.setItem('token', token);
    history.push('/game');

    this.setState({
      email: '',
      name: '',
    });
  };

  render() {
    const { isDisabled } = this.state;
    const { history } = this.props;

    return (
      <div className="login-page">
        <div className="trivia-container">
          <img className="trivia" src={ trivia } alt="trivia" />
        </div>
        {/* <img
          className="question"
          src={ question }
          alt="question mark"

        />
        <img
          className="question1"
          src={ question1 }
          alt="question mark"
        />
        <img
          className="question3"
          src={ question3 }
          alt="question mark"
        />
        <img
          className="question4"
          src={ question4 }
          alt="question mark"
        /> */}

        <form className="form-container" onSubmit={ this.validateLogin }>
          <input
            className="shadow appearance-none border
            rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Qual é o seu e-mail no gravatar?"
            onInput={ this.handleChange }
          />

          <input
            className="shadow appearance-none border
            rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
            type="text"
            name="name"
            onInput={ this.handleChange }
          />

          <button
            className="bg-green-600 w-full
            hover:bg-green-400 text-white
            font-bold py-2 px-4 border-b-4
            border-green-900 hover:border-green-500 rounded"
            data-testid="btn-play"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>

          <button
            className="bg-green-800 w-full
            hover:bg-green-400 text-white
            font-bold py-2 px-4 border-b-4
            border-green-900 hover:border-green-500 rounded"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }

          >
            Settings
          </button>

        </form>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
