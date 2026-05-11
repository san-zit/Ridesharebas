import { useEffect, useState } from "react";

function DateTime() {
 const [time, setTime] = useState(new Date());

 useEffect(() => {
   const interval = setInterval(() => {
     setTime(new Date());
   }, 1000);

   return () => clearInterval(interval);
 }, []);

 const datePart = time.toLocaleDateString("en-GB", {
   weekday: "long",
   day: "2-digit",
   month: "long",
   year: "numeric",
 });

 const timePart = time.toLocaleTimeString("en-GB", {
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
   hour12: true,
 });

 return <div>{`${datePart} ${timePart}`}</div>;
}

export default DateTime;
