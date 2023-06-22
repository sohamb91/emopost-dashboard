import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { api } from '@/services/api';

const Form = (props) => {
  const [formState, setFormState] = useState({});

  const onFormChange = (val) => {
    const { formName, name, value } = val;
    setFormState((prev) => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const submitForm = async (formName: string) => {
    const dataForForm = formState[formName];

    if (formName === 'create_calendar') {
      const {
        workspace = '',
        dateRange: [startDate, endDate] = [],
        website = '',
        platform,
        gender,
        location,
      } = dataForForm;

      if (!workspace || !startDate || !endDate || !website || !platform)
        throw new Error();
      // create calendar call
      const res = await api.createCalendar(workspace);
      if (res.kind === 'ok') {
        // get date diff
        const start = moment(startDate);
        const end = moment(endDate).add(1, 'days')?.startOf('day');
        const dayDiff = end.diff(start, 'days');
        const startDateUTC = start?.valueOf();
        // generate calendar

        const generateCalendarParams = {
          calendar: res?.data,
          noOfDays: dayDiff,
          startDate: moment(startDate).valueOf(),
          url: website,
          platform,
          socket: true,
          audience: {
            age: [20, 30],
            gender,
            location,
          },
        };

        const response = await api.generateCalendar(generateCalendarParams);

        if (response.kind === 'ok') {
          return {
            channelData: response.data,
            calendarId: res?.data,
            days: { start: startDateUTC, range: dayDiff },
          };
        }
        throw new Error('Error fetching socket details');
      } else {
        console.log('in this block');
        throw new Error('Error while creating calendar');
      }
    }
  };

  return <div>{props.children({ onFormChange, formState, submitForm })}</div>;
};

export default Form;
