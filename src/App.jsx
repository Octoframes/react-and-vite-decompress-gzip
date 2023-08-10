import { useState, useEffect } from "react";
import pako from 'pako';

import "./App.css";

function App() {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    fetch("foo_compressed.json.gzip")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        // Decompress the data using pako
        const decompressedData = pako.inflate(new Uint8Array(buffer), { to: 'string' });
        return JSON.parse(decompressedData);
      })
      .then((data) => setTestData(data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  return (
    <div>
      {testData && <pre>{JSON.stringify(testData, null, 2)}</pre>}
    </div>
  );
}

export default App;
