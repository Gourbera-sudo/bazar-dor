// import React from "react";
// import MarqueeText from "react-marquee-text";
// import "react-marquee-text/dist/styles.css";
// const Marquee = async () => {
//   const res = await fetch(
//     "https://api.api-store.workers.dev/api/bazardor/products",
//   );
//   const data = await res.json();
//   console.log(data);
//   return (
//     <div className="border border-gray-500 p-2">
//       <MarqueeText direction="right" duration={10}>
//         {data.map((headline) => (
//           <span key={headline.id} className="flex gap-2.5">
//             <span>{headline.image}</span>
//             <span>{headline.nameBn}</span>
//             <span>{`${headline.today} টাকা/কেজি`}</span>
//             <span>│</span>
//           </span>
//         ))}
//       </MarqueeText>
//     </div>
//   );
// };
// export default Marquee;
