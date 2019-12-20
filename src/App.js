import React, { useState } from 'react';
import video from './images/video.jpg';
import sun from './images/sunny.svg';
import './sass/App.scss';
import moment from 'moment';
import Countdown from 'react-countdown-moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import Http from './config/Fetch';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    marginBottom: '30px',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#00eaa6',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const App = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [value, setValue] = useState(50);
  const [user, setUser] = useState({});

  const login = async () => {
    let response = await Http('auth/google')
    setUser(response)
    console.log(user)
    if(response.email === undefined) {
      alert('debido a cors solo funciona en produccion')
    } 
  }

  const logout = async () => {
    let response = await Http('auth/logout')
    setUser({})
  }

  const handleDateChange = date => {
    setSelectedDate(moment(date));
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="timepicker-container">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              id="time-picker"
              label="Elegir Hora"
              className="timepicker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          { user.name !== undefined ? <p className="text-black">Bienvenido {user.name}</p> : '' }
        </div>
        <img src={video} className="image" alt="logo" />
        <p className="text">
          <img src={sun} className="sun" alt="logo" />
          <span style={value > 50 ? {color: '#EF5350'} : {color: '#00eaa6'}}>{value}%</span> ~ <Countdown endDate={selectedDate} />
        </p>
        <PrettoSlider aria-label="pretto slider" defaultValue={50} onChange={handleSliderChange}/>
        { user.email !== undefined ? 
          <Button onClick={() => logout()} variant="contained">Salir</Button>
        :
          <Button onClick={() => login()} variant="contained">Entrar</Button>
        }
      </header>
    </div>
  );
}

export default App;
