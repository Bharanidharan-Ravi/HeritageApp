import React, { useEffect, useState } from "react";
import { client, urlFor } from "/src/sanityClient"; 
import { walkConfig } from "../Config/walk.config";

export default function Walks() {
  const [walks, setWalks] = useState([]);
  const [contactInfo, setContactInfo] = useState(null); 
  const [selectedWalk, setSelectedWalk] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const { theme, content } = walkConfig;

  useEffect(() => {
    const query = `{
      "walks": *[_type == "walk"] | order(date asc) { ..., qrCode },
      "settings": *[_type == "contact"][0]
    }`;

    client.fetch(query).then((data) => {
        setWalks(data.walks);
        setContactInfo(data.settings);
      }).catch(console.error);
  }, []);

  const getDateParts = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    };
  };

  const closeModal = () => { setSelectedWalk(null); setShowQR(false); };

  return (
    // NORMAL VIEW:
    // Removed: rounded-t-[...], -mt-20, shadows
    // Added: Standard py-24, border-t for separation
    <section 
      className="relative z-10 py-24 min-h-screen border-t border-[#C19D60]/20"
      style={{ backgroundColor: theme.sectionBackground }}
    >
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <span className="font-sans font-bold tracking-[0.25em] uppercase text-xs block mb-4" 
                style={{ color: theme.accentColor }}>
            {content.sectionBadge}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium drop-shadow-xl" 
              style={{ color: theme.headerTextColor }}>
            {content.sectionTitle}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto font-light opacity-80" 
             style={{ color: theme.headerTextColor }}>
             {content.sectionSubtitle}
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {walks.map((walk) => {
            const { day, month } = walk.date ? getDateParts(walk.date) : { day: "TBA", month: "" };

            return (
              // Standard Card Layout
              <div 
                key={walk._id} 
                className="group rounded-[2rem] overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                style={{ backgroundColor: theme.cardBackground }}
              >
                
                {/* Image Area */}
                <div className="h-72 overflow-hidden relative cursor-pointer" onClick={() => setSelectedWalk(walk)}>
                  {walk.mainImage ? (
                    <img 
                      src={urlFor(walk.mainImage).width(600).height(400).url()} 
                      alt={walk.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No Image</div>
                  )}
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center w-16 py-3 text-center"
                       style={{ backgroundColor: theme.sectionBackground }}>
                    <span className="text-[10px] font-bold uppercase w-full tracking-widest" style={{ color: theme.accentColor }}>{month}</span>
                    <span className="text-2xl font-serif font-bold text-white">{day}</span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow relative">
                  
                  {/* Location Tag */}
                  <div className="absolute -top-4 right-8 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md"
                       style={{ backgroundColor: theme.accentColor, color: theme.sectionBackground }}>
                     {walk.location || 'Tamil Nadu'}
                  </div>

                  <h3 className="text-3xl font-serif font-medium mb-4 leading-tight cursor-pointer transition-colors group-hover:opacity-70 mt-2" 
                      style={{ color: theme.cardTextColor }}
                      onClick={() => setSelectedWalk(walk)}>
                    {walk.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed mb-8 line-clamp-3 font-sans flex-grow font-light"
                     style={{ color: theme.cardSecondaryText }}>
                    {walk.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <span className="text-xs uppercase tracking-wider block opacity-50" style={{ color: theme.cardSecondaryText }}>Price</span>
                      <span className="text-xl font-bold" style={{ color: theme.cardTextColor }}>{content.currencySymbol}{walk.price}</span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedWalk(walk)}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg text-white"
                      style={{ backgroundColor: theme.sectionBackground }}
                    >
                      <svg className="w-5 h-5" style={{ color: theme.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL (Standard) --- */}
      {selectedWalk && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-fadeInUp"
               style={{ backgroundColor: theme.modalBackground }}>
            
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 bg-black/10 hover:bg-black hover:text-white text-black rounded-full p-2 backdrop-blur-md md:hidden">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
               {selectedWalk.mainImage && (
                 <img src={urlFor(selectedWalk.mainImage).width(800).url()} className="w-full h-full object-cover" />
               )}
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-14 overflow-y-auto" style={{ backgroundColor: theme.modalBackground }}>
                {!showQR ? (
                  <>
                    <h2 className="text-4xl font-serif font-medium mb-6" style={{ color: theme.cardTextColor }}>{selectedWalk.title}</h2>
                    <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-200">
                        <div>
                            <span className="text-xs uppercase tracking-wider block mb-1 opacity-60">Date</span>
                            <span className="font-bold">{selectedWalk.date ? getDateParts(selectedWalk.date).day + " " + getDateParts(selectedWalk.date).month : "TBA"}</span>
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-wider block mb-1 opacity-60">Ticket</span>
                            <span className="font-bold text-lg" style={{ color: theme.accentColor }}>{content.currencySymbol}{selectedWalk.price}</span>
                        </div>
                    </div>
                    <p className="mb-8 leading-relaxed font-light text-lg opacity-80" style={{ color: theme.cardSecondaryText }}>
                      {selectedWalk.description}
                    </p>
                    <button onClick={() => setShowQR(true)} className="w-full py-4 font-bold uppercase tracking-widest transition-colors rounded-xl shadow-lg text-white hover:opacity-90"
                      style={{ backgroundColor: theme.sectionBackground }}>
                      <span style={{ color: theme.accentColor }}>{content.confirmButton}</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <button onClick={() => setShowQR(false)} className="self-start mb-4 text-xs font-bold uppercase opacity-50 hover:opacity-100">{content.backText}</button>
                    <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: theme.cardTextColor }}>{content.scanTitle}</h3>
                    <div className="p-4 bg-white rounded-xl shadow-inner border mb-6">
                      {selectedWalk.qrCode && <img src={urlFor(selectedWalk.qrCode).width(300).url()} className="w-48 h-48 object-contain" />}
                    </div>
                    {contactInfo?.whatsappNumber && (
                      <a href={`https://wa.me/${contactInfo.whatsappNumber}?text=Payment done for ${selectedWalk.title}`} target="_blank" rel="noreferrer"
                         className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold shadow-lg transition-transform hover:scale-105"
                         style={{ backgroundColor: "#25D366" }}>
                         {content.whatsappButton}
                      </a>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn" onClick={() => setFullScreenImage(null)}>
          <img src={urlFor(fullScreenImage).width(1200).url()} className="max-w-full max-h-full object-contain shadow-2xl" />
        </div>
      )}

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeInUp { animation: fadeInUp 0.3s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </section>
  );
}


// import React, { useEffect, useState } from "react";
// import { client, urlFor } from "/src/sanityClient";

// export default function Walks() {
//   const [walks, setWalks] = useState([]);
//   const [contactInfo, setContactInfo] = useState(null); // <--- NEW STATE for Settings
//   const [selectedWalk, setSelectedWalk] = useState(null);
  
//   const [showQR, setShowQR] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     // UPDATED QUERY: Fetches Walks AND Contact Settings together
//     const query = `{
//       "walks": *[_type == "walk"] | order(date asc) {
//         ...,
//         qrCode
//       },
//       "settings": *[_type == "contact"][0]
//     }`;

//     client.fetch(query)
//       .then((data) => {
//         setWalks(data.walks);
//         setContactInfo(data.settings); // <--- Save settings
//       })
//       .catch(console.error);
//   }, []);

//   const getDateParts = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       day: date.getDate(),
//       month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
//       fullDate: date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
//     };
//   };

//   const closeModal = () => {
//     setSelectedWalk(null);
//     setShowQR(false);
//   };

//   return (
//     <section className="py-24 bg-[#f6f2ea] text-[#0b1720] relative">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* HEADER */}
//         <div className="text-center mb-16">
//           <span className="text-[#caa863] font-sans font-bold tracking-[0.2em] uppercase text-xs">
//             Join the Journey
//           </span>
//           <h2 className="text-4xl md:text-6xl font-serif font-medium mt-4 text-[#0b1720]">
//             Upcoming Heritage Trails
//           </h2>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {walks.map((walk) => {
//             const { day, month } = walk.date ? getDateParts(walk.date) : { day: "TBA", month: "" };

//             return (
//               <div key={walk._id} className="group bg-white rounded-xl overflow-hidden border border-[#0b1720]/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                
//                 {/* Main Card Image */}
//                 <div 
//                   className="h-64 overflow-hidden relative cursor-pointer" 
//                   onClick={() => setSelectedWalk(walk)}
//                 >
//                   {walk.mainImage ? (
//                     <img 
//                       src={urlFor(walk.mainImage).width(600).height(400).url()} 
//                       alt={walk.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
//                   )}
//                   <div className="absolute top-4 left-4 bg-white/95 text-[#0b1720] rounded shadow-lg overflow-hidden flex flex-col items-center w-14 text-center">
//                     <span className="bg-[#caa863] text-[#0b1720] text-[10px] font-bold uppercase w-full py-1 tracking-wider">{month}</span>
//                     <span className="text-2xl font-serif font-bold py-1">{day}</span>
//                   </div>
//                 </div>
                
//                 {/* Card Content */}
//                 <div className="p-8 flex flex-col flex-grow">
//                   <div className="flex items-center gap-2 text-xs font-bold text-[#caa863] uppercase tracking-widest mb-3">
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
//                     {walk.location || 'Tamil Nadu'}
//                   </div>

//                   <h3 className="text-2xl font-serif font-bold mb-4 text-[#0b1720] group-hover:text-[#caa863] transition-colors leading-tight cursor-pointer" onClick={() => setSelectedWalk(walk)}>
//                     {walk.title}
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 font-sans flex-grow">
//                     {walk.description}
//                   </p>
                  
//                   <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
//                     <div>
//                       <span className="text-gray-400 text-xs uppercase tracking-wider block">Price</span>
//                       <span className="text-lg font-bold text-[#0b1720]">₹{walk.price}</span>
//                     </div>
//                     <button 
//                       onClick={() => setSelectedWalk(walk)}
//                       className="px-6 py-3 border border-[#0b1720] text-[#0b1720] text-xs font-bold uppercase tracking-widest hover:bg-[#0b1720] hover:text-white transition-all"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- DETAILS MODAL --- */}
//       {selectedWalk && (
//         <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>

//           <div className="relative bg-[#f6f2ea] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-fadeInUp">
            
//             <button onClick={closeModal} className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white text-white hover:text-black rounded-full p-2 backdrop-blur-md md:hidden">
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//             </button>

//             {/* Left: Image */}
//             <div className="w-full md:w-1/2 h-64 md:h-auto relative group cursor-zoom-in" onClick={() => setFullScreenImage(selectedWalk.mainImage)}>
//                {selectedWalk.mainImage && (
//                  <img 
//                    src={urlFor(selectedWalk.mainImage).width(800).url()} 
//                    alt={selectedWalk.title}
//                    className="w-full h-full object-cover"
//                  />
//                )}
//                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <span className="text-white bg-black/50 px-3 py-1 rounded text-xs uppercase tracking-widest backdrop-blur-md">View Full Image</span>
//                </div>
//             </div>

//             {/* Right: Details */}
//             <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#f6f2ea]">
                
//                 {!showQR ? (
//                   <>
//                     <div className="flex justify-between items-start mb-6">
//                       <div>
//                           <span className="text-[#caa863] font-bold text-xs uppercase tracking-widest">Heritage Walk</span>
//                           <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0b1720] mt-2 leading-tight">{selectedWalk.title}</h2>
//                       </div>
//                       <button onClick={closeModal} className="hidden md:block text-gray-400 hover:text-red-500 transition-colors">
//                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-2 gap-6 mb-8 border-y border-[#0b1720]/10 py-6">
//                         <div>
//                             <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Date</span>
//                             <span className="text-[#0b1720] font-bold">{selectedWalk.date ? getDateParts(selectedWalk.date).fullDate : "TBA"}</span>
//                         </div>
//                         <div>
//                             <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Location</span>
//                             <span className="text-[#0b1720] font-bold">{selectedWalk.location}</span>
//                         </div>
//                         <div>
//                             <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Ticket</span>
//                             <span className="text-[#caa863] font-bold text-lg">₹{selectedWalk.price}</span>
//                         </div>
//                     </div>

//                     <div className="prose prose-stone text-gray-700 mb-8 leading-relaxed text-sm md:text-base">
//                       <p>{selectedWalk.description}</p>
//                     </div>

//                     <div className="flex gap-4">
//                       <button 
//                         onClick={() => setShowQR(true)}
//                         className="flex-1 py-4 bg-[#0b1720] text-white font-bold uppercase tracking-widest hover:bg-[#caa863] hover:text-[#0b1720] transition-colors shadow-xl"
//                       >
//                           Confirm Booking
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   // --- QR CODE & WHATSAPP SECTION ---
//                   <div className="flex flex-col items-center justify-center h-full text-center animate-fadeInUp">
//                     <button onClick={() => setShowQR(false)} className="self-start mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#0b1720]">
//                       ← Back to Details
//                     </button>
                    
//                     <h3 className="text-2xl font-serif font-bold mb-2">Scan to Pay</h3>
//                     <p className="text-gray-500 text-sm mb-6">Use any UPI app (GPay, PhonePe, Paytm)</p>
                    
//                     <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6">
//                        {selectedWalk.qrCode ? (
//                          <img 
//                            src={urlFor(selectedWalk.qrCode).width(300).url()} 
//                            alt="Payment QR" 
//                            className="w-48 h-48 object-contain"
//                          />
//                        ) : (
//                          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
//                            QR Code Not Uploaded
//                          </div>
//                        )}
//                     </div>
                    
//                     <div className="text-lg font-bold text-[#0b1720] mb-4">
//                        Amount: <span className="text-[#caa863]">₹{selectedWalk.price}</span>
//                     </div>

//                     {/* DYNAMIC WHATSAPP BUTTON */}
//                     {contactInfo?.whatsappNumber ? (
//                       <a 
//                         // Creates a direct WhatsApp link
//                         href={`https://wa.me/${contactInfo.whatsappNumber}?text=Hi, I have paid for the ${selectedWalk.title} walk. Here is the screenshot.`}
//                         target="_blank" 
//                         rel="noreferrer"
//                         className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#128C7E] transition-all transform hover:scale-105"
//                       >
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.54 1.651.893 2.806.893 3.183 0 5.768-2.586 5.768-5.766 0-3.18-2.585-5.766-5.768-5.766zm.92 7.823h-1.541v-3.691l2.083 2.082 2.197-2.197-2.739 3.806z"/></svg>
//                         Send Screenshot
//                       </a>
//                     ) : (
//                       <p className="text-red-500 text-xs">WhatsApp Number not set in Backend</p>
//                     )}
                    
//                   </div>
//                 )}

//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- FULL SCREEN LIGHTBOX --- */}
//       {fullScreenImage && (
//         <div 
//           className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
//           onClick={() => setFullScreenImage(null)}
//         >
//           <button className="absolute top-6 right-6 text-white/50 hover:text-white">
//              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
          
//           <img 
//             src={urlFor(fullScreenImage).width(1200).url()} 
//             alt="Full Screen View"
//             className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
//           />
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fadeInUp { animation: fadeInUp 0.3s ease-out forwards; }
//         .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
//       `}</style>
//     </section>
//   );
// }