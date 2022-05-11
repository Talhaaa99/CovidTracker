import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@mui/material";
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryPicker}) => {

    const [countries, setCountries ] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            setCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setCountries]);

    return (
        <FormControl className={styles.formcontrol}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryPicker(e.target.value)}>
                <option value="">Global</option>
                {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
