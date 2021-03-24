import Login from './Pages/Login'
import Debts from './Pages/Debts'
import {
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  const hasTokenValid = true


  if (!hasTokenValid) return <Login />
  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <>
            <div className="general-container">
              <Route path="/dividas" exact component={Debts} />
            </div>
          </>
        )}
      />
    </Switch>
  );
}

export default App;
