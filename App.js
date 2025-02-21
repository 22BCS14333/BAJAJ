import React, { useState } from "react";
import axios from "axios";

function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const backendURL = "https://bajaj-phi-rose.vercel.app/"; // Replace with actual URL

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await axios.post(backendURL, parsedData);
            setResponse(res.data);
            setError("");
        } catch (err) {
            setError("Invalid JSON input");
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>Data Processor</h1>
            <textarea 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder='Enter JSON input'
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {response && (
                <div>
                    <h3>Filter Results:</h3>
                    <select 
                        multiple 
                        value={selectedOptions} 
                        onChange={(e) =>
                            setSelectedOptions([...e.target.selectedOptions].map(opt => opt.value))
                        }
                    >
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>

                    <div>
                        {selectedOptions.includes("alphabets") && <p>Alphabets: {response.alphabets.join(", ")}</p>}
                        {selectedOptions.includes("numbers") && <p>Numbers: {response.numbers.join(", ")}</p>}
                        {selectedOptions.includes("highest_alphabet") && <p>Highest Alphabet: {response.highest_alphabet}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;