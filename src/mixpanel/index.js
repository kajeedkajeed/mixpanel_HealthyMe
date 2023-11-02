import mixpanel from 'mixpanel-browser';
mixpanel.init('17c39ca113944333d3ec43f01174252d', { debug: true });

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