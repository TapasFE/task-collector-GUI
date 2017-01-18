import Restful from 'restful-fetch';

export const restful = new Restful({
  root: '/api',
  presets: ['json'],
  config: {
    credentials: 'same-origin',
  },
});

export const Tasks = restful.model('tasks');
export const Me = restful.model('me');
