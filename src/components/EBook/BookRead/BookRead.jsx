import React, { useState } from 'react';
import { ReactReader } from 'react-reader';

// Use the raw GitHub URL for the EPUB file
const fileUrl = "https://raw.githubusercontent.com/mahfuzhasanreza/ebook-epub/main/living_with_chronic_depression.epub";

const BookRead = () => {
  const [location, setLocation] = useState("");

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
        url={fileUrl} // Using the raw URL from GitHub
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
      />
    </div>
  );
};

export default BookRead;
