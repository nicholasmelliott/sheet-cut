import './App.css'
import ResponsiveList from '../RespList/respList';
import ViewBox from '../ViewBox/viewBox';

function App() {
  return (
    <div className="App">
      <ViewBox/>
      <div className="card">
        <ResponsiveList/>
      </div>
    </div>
  )
}

export default App
