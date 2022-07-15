import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      btnClass: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        userNumber: '',
        btnClass: true,
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
    console.log(this.state);
  };

  resetInfo = () => {
    this.setState({
      ...this.state,
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      btnClass: false,
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>

          <input
            className={style.input}
            type="number"
            id="user_number"
            onChange={this.handleChange}
            value={this.state.userNumber}
          />
          <button className={style.btn}>Угадать</button>
          {this.state.btnClass ?
          <button className={style.btn} onClick={this.resetInfo}
          >Сыграть еще?</button> : null}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
