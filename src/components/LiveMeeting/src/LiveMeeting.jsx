import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

// const LiveMeeting = () => {
//   return (
//     <div>
//       {/* ReactDOM.render( */}
//       <div>
//         <ToastContainer
//           toastClassName={() =>
//             "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
//           }
//           bodyClassName={() => "text-black text-base font-normal"}
//           position="bottom-left"
//           autoClose={4000}
//           hideProgressBar={true}
//           newestOnTop={false}
//           closeButton={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//         <App />
//       </div>,
//       {/* ); */}
//     </div>
//   );
// };

// export default LiveMeeting;


const LiveMeeting = () => {
  return (
      <div className="bg-gradient-to-br from-black to-purple-700">
        <Helmet>
        <title>Professional Support | Kawan</title>
      </Helmet>
        <ToastContainer
          toastClassName={() =>
            "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
          }
          bodyClassName={() => "text-black text-base font-normal"}
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </div>
  );
};

export default LiveMeeting;
