import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';
import corona from './images/corona.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryPicker = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={corona} alt='Covid-19'></img>
        <Cards data={data} />
        <CountryPicker handleCountryPicker={this.handleCountryPicker} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default App;