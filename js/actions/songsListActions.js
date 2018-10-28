import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import axios from '../axios';
import moment from 'moment';

export const getMusicList = (genre,decades,gender) => async dispatch => {
    const baseUrl = "http://api.musicgraph.com/api/v2/artist/{id}/social-urls" + id;
    try {
        axios.get(baseUrl).then((res) => {
            let PatientMedicalHistory = (res.data && res.data._embedded) ? res.data._embedded : [];

            dispatch({
                type: 'MEDICAL_HISTORY',
                payload: PatientMedicalHistory
            });
        });


    } catch (error) {
        console.log(error);
    }
}