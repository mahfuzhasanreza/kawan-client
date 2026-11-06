import React from "react";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import { ParticipantView } from "./ParticipantView";

const MemoizedParticipant = React.memo(
  ParticipantView,
  (prevProps, nextProps) => {
    return prevProps.participantId === nextProps.participantId;
  }
);

function ParticipantGrid({ participantIds, isPresenting }) {

  // participantIds = participantIds.filter((_, index) => index % 2 === 0);
  // Reduce the size of participantIds to half
  // participantIds = participantIds.slice(0, Math.floor(participantIds.length / 2));

  // participantIds = participantIds.filter((_, index) => index !== 1);


  const { sideBarMode } = useMeetingAppContext();
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  const perRow =
    isMobile || isPresenting
      ? participantIds.length < 4
        ? 1
        : participantIds.length < 9
          ? 2
          : 3
      : participantIds.length < 5
        ? 2
        : participantIds.length < 7
          ? 3
          : participantIds.length < 9
            ? 4
            : participantIds.length < 10
              ? 3
              : participantIds.length < 11
                ? 4
                : 4;

  // console.log(participantIds[0], participantIds[1] ,"ParticipantGrid------------------Check");
  console.log(participantIds, "checksssssssssssss"); // Log the participant IDs to see if they are correct

  return (
    <div
      className={`flex flex-col lg:flex-row flex-grow m-3 items-center justify-center ${participantIds.length < 2 && !sideBarMode && !isPresenting
        ? "lg:px-16 lg:py-2"
        : participantIds.length < 3 && !sideBarMode && !isPresenting
          ? "lg:px-16 lg:py-8"
          : participantIds.length < 4 && !sideBarMode && !isPresenting
            ? "lg:px-16 lg:py-4"
            : participantIds.length > 4 && !sideBarMode && !isPresenting
              ? "lg:px-14"
              : "lg:px-0"
        }`}
    >
      <div className="flex flex-col w-full h-full">
        {Array.from(
          { length: Math.ceil(participantIds.length / perRow) },
          (_, i) => {
            return (
              <div
                key={`participant-${i}`}
                className={`flex flex-1 ${isPresenting
                  ? participantIds.length === 1
                    ? "justify-start items-start"
                    : "items-center justify-center"
                  : "items-center justify-center"
                  }`}
              >
                {participantIds
                  .slice(i * perRow, (i + 1) * perRow)
                  .map((participantId) => {
                    return (
                      <div
                        key={`participant_${participantId}`}
                        className={`flex flex-1 ${isPresenting
                          ? participantIds.length === 1
                            ? "lg:h-48 lg:w-44 xl:w-52 xl:h-48 "
                            : participantIds.length === 2
                              ? "lg:w-44 xl:w-56"
                              : "lg:w-44 xl:w-48"
                          : "w-full"
                          } items-center justify-center h-full ${participantIds.length === 1
                            ? "lg:max-w-7xl 2xl:max-w-[1480px] "
                            : "lg:max-w-lg 2xl:max-w-2xl"
                          } overflow-clip overflow-hidden  p-1`}
                      >
                        <MemoizedParticipant participantId={participantId} />
                      </div>
                    );
                  })}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.participantIds) ===
      JSON.stringify(nextProps.participantIds) &&
      prevProps.isPresenting === nextProps.isPresenting
    );
  }
);
