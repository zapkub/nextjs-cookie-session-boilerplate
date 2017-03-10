import withApp from '../lib/withApp';
import withAPI from '../lib/withAPI';
import { compose, withState } from 'recompose';

export default compose(
    withApp(),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withAPI(),
)(({ email, password, setEmail, setPassword, doLogin, user, url }) => (<div>
  {
      user ? <div>{user.email}</div> : (
        <div>
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <input value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={() => doLogin(email, password)}> login </button>
        </div>
      )
  }

</div>));
