// import React, { useState } from 'react';
// import { ReactReader } from 'react-reader';

// // Use the raw GitHub URL for the EPUB file
// const fileUrl = "https://raw.githubusercontent.com/mahfuzhasanreza/ebook-epub/main/living_with_chronic_depression.epub";

// const BookRead = () => {
//     const [location, setLocation] = useState("");

//     return (
//         <div style={{ height: '100vh' }}>
//             <ReactReader
//                 url={fileUrl} // Using the raw URL from GitHub
//                 location={location}
//                 locationChanged={(epubcfi) => {
//                     setLocation(epubcfi);
//                     // console.log("Current location (CFI):", epubcfi);
//                     console.log("Location", location);
//                 }}
//             />
//         </div>
//     );
// };

// export default BookRead;


import React, { useState } from 'react';
import { ReactReader } from 'react-reader';

const fileUrl = "https://raw.githubusercontent.com/mahfuzhasanreza/ebook-epub/main/living_with_chronic_depression.epub";

const BookRead = () => {
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track approximate page number

  const handleLocationChange = (epubcfi) => {
    setLocation(epubcfi); // Track the CFI
    console.log("Current location (CFI):", epubcfi);

    // Increment page number based on CFI (you could modify this to be more precise)
    const pageNumber = calculatePageNumber(epubcfi);
    setCurrentPage(pageNumber);
  };

  // A simple function to estimate page number (you can customize this logic)
  const calculatePageNumber = (epubcfi) => {
    // Here you can implement your logic to split the content into pages.
    // For example, you might increment a page number for each chapter or section
    const totalSections = 10; // Example: Assume 10 sections or chapters
    const sectionIndex = parseInt(epubcfi.split('/')[3]) || 1; // Just an example logic
    return Math.ceil((sectionIndex / totalSections) * 100); // Approximate page number
  };

  return (
    <div style={{ height: '90vh' }}>
      <ReactReader
        url={fileUrl} // Your raw GitHub file URL
        location={location} // Set the location to navigate to the saved location
        locationChanged={handleLocationChange} // Detect location change
      />
      <div>
        <h3>Approximate Current Page:</h3>
        <p>{currentPage}</p> {/* Display the calculated page */}
      </div>
    </div>
  );
};

export default BookRead;
