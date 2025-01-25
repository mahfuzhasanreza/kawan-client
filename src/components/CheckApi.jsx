import React from "react";

const CheckApi = () => {
  const handlePostRequest = async () => {
    const url = "https://6da1-34-123-80-41.ngrok-free.app/process_query";
    const data = { query: "what's kawan" };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePostRequest}>Send Query</button>
    </div>
  );
};

export default CheckApi;
