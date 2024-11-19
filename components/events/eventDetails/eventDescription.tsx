import { format } from "date-fns";
import { eventCategory } from "lib/db";
import React, { useState } from "react";

const EventDescription = ({ event }: any) => {
  const [description, setDescription] = useState(event?.details?.slice(0, 500));

  return (
    <div className="grid grid-cols-1 text-gray-200 text-center w-full rounded-md py-6 p-4">
      <div className="lg:w-[1050px]  w-full text-center mx-auto px-auto rounded-md">
        <p className="ui_title text-brand_color">EVENT DETAILS</p>
        <div className="bg-gray-700 w-full text-gray-50 p-6 rounded-md text-center">
          <div className="space-y-3">
            <div className="grid grid-cols-2 text-left">
              <div>
                <p>Event Name:</p>
              </div>
              <div  className="md:-ml-60">
                <p>{event.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-left">
              <div>
                <p>Date:</p>
              </div>
              <div  className="md:-ml-60">
                <p>{format(new Date(event.eventTime), "MMM dd 'at' hh:MM a")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-left">
              <div>
                <p>Duration:</p>
              </div>
              <div  className="md:-ml-60">
                <p>{event.duration}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-left">
              <div>
                <p>Location:</p>
              </div>
              <div  className="md:-ml-60">
                <p>{event.venue}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 text-left">
              <div>
                <p className="text-gray-200 text-lg">
                  Description:{""}
                </p>
              </div>
              <div
                className="text-md text-gray-200 space-y-3 mt-3 md:-ml-60"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </div>
          {description && (
            <div>
              <p
                onClick={() =>
                  setDescription(
                    description.length > 500
                      ? event.details.slice(0, 500)
                      : event.details
                  )
                }
              >
                {description.length > 500 ? (
                  <p className="px-2 py-1 text-gray-200 text-sm rounded-md cursor-pointer bg-gray-900 w-max mx-auto mt-3">
                    See less{" "}
                  </p>
                ) : null}

                {!description.length && event.details > 500 ? (
                  <p className="px-2 py-1 text-gray-200 text-sm rounded-md cursor-pointer bg-gray-900 w-max mx-auto mt-3">
                    See more{" "}
                  </p>
                ) : null}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
