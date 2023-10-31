import mixpanel from 'mixpanel-browser';
mixpanel.init('44689763cb96bd2deae85e9c36d5d3a4', { debug: true });

let env_check = true;

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
  register: (props) => {
    if (env_check) mixpanel.register(props);
  },
  register_once: (props) => {
    if (env_check) mixpanel.register_once(props);
  },
  reset: () => {
    if (env_check) mixpanel.reset();
  }
};

export let Mixpanel = actions; 