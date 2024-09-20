import React, { useState } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const extractTextFromPdf = async (file) => {
    const pdfData = await pdfjsLib.getDocument(URL.createObjectURL(file))
      .promise;
    let text = "";

    for (let i = 1; i <= pdfData.numPages; i++) {
      const page = await pdfData.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += `${pageText} `;
    }
    return text;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    try {
      const text = await extractTextFromPdf(file);
      setExtractedText(text);
      console.log(text);

      const response = await axios
        .post("http://localhost:4000/users/summary", { text })
        .then((response) => {
          console.log("Upload successful:", response.data);
          setExtractedText(response.data.summary);
        })
        .catch((error) => {
          console.error("Error uploading text:", error);

          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error data:", error.response.data);
            console.log("Error status:", error.response.status);
            console.log("Error headers:", error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error message:", error.message);
          }

          // Handle error here
          // For example, you might want to show an error message to the user
        });
      console.log(response.data);
    } catch (error) {
      console.error("Error processing or sending text to backend:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload PDF</button>
      </form>
      <div>
        <h3>Extracted Text:</h3>
        <p>{extractedText}</p>
      </div>
    </div>
  );
};

export default PdfUploader;
