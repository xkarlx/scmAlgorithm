import logo from './logo.svg';
import './style/theme.scss';


import  RoutesApp from './routes/routes';

import useWindowDimensions from './components/useWindowDimensions';

/**
 * main entry point
 */
function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App " style={{height:height}}  >
     
      <RoutesApp  ></RoutesApp>
      
    </div>
  );
}

export default App;
