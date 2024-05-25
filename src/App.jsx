import { useState } from "react";

function App() {
  const [searchImage, setSearchImage] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const API_TOKEN = "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";

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify({ inputs: searchImage }),
        }
      );

      const blobData = await response.blob();
      console.log(blobData);

      const imgSrc = URL.createObjectURL(blobData);
      setGeneratedImage(imgSrc);
    } catch (error) {
      console.log(error);
    }
  }

  const showImage = () => {
    fetchData();
    setSearchImage("");
  };

  return (
    <div>
      <div className="flex flex-col w-[50%] m-auto justify-center items-center mt-10 p-10 shadow-xl">
        <h1 className="text-3xl font-bold ">Image Generation App</h1>
        <input
          type="text"
          placeholder="Enter a text"
          className="border-2 p-2 w-[50%] mt-5"
          value={searchImage}
          onChange={(e) => setSearchImage(e.target.value)}
        />
        <button
          className="mt-5 bg-[#000] text-[#fff] p-2 rounded-lg w-[15%]"
          onClick={showImage}
        >
          Generate
        </button>
      </div>
      <div className="mt-10 h-[400px] w-[500px] border-2 m-auto p-5">
        {generatedImage && <img src={generatedImage} alt="Image" />}
      </div>
    </div>
  );
}

export default App;
