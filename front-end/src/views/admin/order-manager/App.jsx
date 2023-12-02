import React, { useState } from 'react';
// import './App.css';
// import HowToUse from './HowToUse.jsx';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import ResultContainerPlugin from './ResultContainerPlugin.jsx';

const AppBarCode = ({getResult}) => {
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    getResult(decodedText);
    setDecodedResults(prev => [...prev, decodedResult]);
  };

  return (
    <div className="App" style={{ width: "500px" }}>
      <section className="App-section">
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <ResultContainerPlugin results={decodedResults} />
      </section>
    </div>
  );
};

export default AppBarCode;
