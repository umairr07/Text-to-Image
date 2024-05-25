import { useState } from "react";

function App() {
  const [serachval, setSearchval] = useState("");
  const [generatedimg, setGeneratedimg] = useState("");
  // const API_KEY = "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";
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  // query({ "inputs": "Astronaut riding a horse" }).then((response) => {
  //   // Use image
  // });

  const generateimage = async () => {
    await query({ inputs: serachval }).then((response) => {
      const imgsrc = URL.createObjectURL(response);
      setGeneratedimg(imgsrc);
      console.log(response);
    });
  };

  return (
    <div>
      <div className="flex flex-col w-[50%] m-auto justify-center items-center mt-10 p-10 shadow-xl">
        <h1 className="text-3xl font-bold ">Image Generation App</h1>
        <input
          type="text"
          placeholder="Enter a text"
          className="border-2 p-2 w-[50%] mt-5"
          value={serachval}
          onChange={(e) => setSearchval(e.target.value)}
        />
        <button
          className="mt-5 bg-[#000] text-[#fff] p-2 rounded-lg w-[15%]"
          onClick={generateimage}
        >
          Generate
        </button>
      </div>
      <div className="mt-10 h-[400px] w-[500px]  m-auto p-5">
        {generatedimg && <img src={generatedimg} alt="Image" />}
      </div>
    </div>
  );
}

export default App;
