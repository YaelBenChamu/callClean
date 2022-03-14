import './App.css';
import HomeRouter from './component/homeRoute';
import Header from './component/header/Header';
import Loading from './component/common-components/loading/loading'
import Error from './component/common-components/error'
import Success from './component/common-components/success'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="router">
        <div className="page">
          <HomeRouter></HomeRouter>
          <Loading />
          <Error />
          <Success/>
        </div>
      </div>
    </div>
  );
}

export default App;
