import React from 'react';


export default function withApp(options) {
  return function (Component) {
    return class withApp extends React.Component {
      render() {
        return (<div>
          <Component msg="hello" {...this.props} />
        </div>);
      }
};
  };
}
