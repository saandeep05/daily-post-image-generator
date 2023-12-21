import ImageGenerator from './ImageGenerator';
import haikei_bg from './assets/blob-scene-haikei.png'

function App() {
  const appStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    backgroundImage: haikei_bg
  }
  
  return (
    <div className="App">
      <ImageGenerator />
    </div>
  );
}

export default App;
