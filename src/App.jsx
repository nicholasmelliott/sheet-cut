import './App.css'
import ResponsiveList from './respList';
import ViewBoxWrapper from './viewBoxWrapper';

function App() {
  return (
    <div className="App">
      <ViewBoxWrapper/>
      <div className="card">
        <ResponsiveList/>
      </div>
    </div>
  )
}

export default App
