// import CheckMediaPermission from '../CheckMediaPermission/CheckMediaPermission';

// const VideoStreaming = () => {
//     return (
//         <div>
//             <CheckMediaPermission></CheckMediaPermission>
//         </div>
//     );
// };

// export default VideoStreaming;
import { useEffect, useState } from "react";
import { createMeeting, getToken } from "./api.js";

function VideoStreaming() {
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingToken = async () => {
    const token = await getToken();
    setToken(token);
    const ID = await createMeeting({token});
    console.log("ID", ID);
    setMeetingId(ID);
  };

  console.log("meetingId", meetingId);

  useEffect(() => {
    getMeetingToken();
  }, []);

  return token ? <h1>{JSON.stringify(meetingId)}</h1> : null;
}

export default VideoStreaming;
