import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // THEME COLOR
  const THEME_ACCENT = "#FFD050"; 

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for the fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col font-serif bg-[#0b1720]">
      
      {/* --- SMART HEADER (Fixed Full Width) --- */}
      <header 
        // className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        //   isScrolled 
        //     ? "h-20 bg-[#0b1720]/90 backdrop-blur-md shadow-xl border-white/5" 
        //     : "h-28 bg-transparent border-transparent"
        // }`}
         className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? "h-20 bg-[#0b1720]/90 backdrop-blur-md shadow-xl border-white/5" 
            : "h-28 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <button onClick={() => handleNavClick("home")} className="group flex items-center gap-3">
            <div 
              className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors duration-500 font-bold text-xl shadow-lg ${
              isScrolled ? "text-[#0b1720]" : "bg-white/10 text-white backdrop-blur-md border border-white/20"
              }`}
              style={{ backgroundColor: isScrolled ? THEME_ACCENT : '' }}
            >
              AT
            </div>
            <div className="text-left flex flex-col">
              <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md leading-none">
                Archaeo Trails
              </h1>
              <span className={`text-[10px] tracking-[0.2em] uppercase font-medium mt-1 ${isScrolled ? 'text-[#FFD050]' : 'text-gray-300'}`}>
                Center for Heritage Learning
              </span>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {['About', 'walks', 'Discover', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())} 
                className="text-sm font-bold uppercase tracking-[0.15em] text-white hover:text-[#FFD050] transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#FFD050] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-[#FFD050] text-[#0b1720] hover:bg-white hover:text-[#0b1720] transition-all duration-300 shadow-[0_0_20px_rgba(255,208,80,0.3)]">
              Book A Trail
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#0b1720] border-t border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
           <div className="flex flex-col p-6 gap-4 text-white text-center">
              {['About', 'walks', 'Discover', 'Contact'].map((item) => (
                <button key={item} onClick={() => handleNavClick(item.toLowerCase())} className="py-2 hover:text-[#FFD050] uppercase tracking-widest font-bold">{item}</button>
              ))}
           </div>
        </div>
      </header>

      <main className="flex-grow">
         {/* No padding for home page so Hero hits the top */}
         <div className={isHomePage ? "" : "pt-28"}> 
            <Outlet /> 
         </div>
      </main>

      <footer className="bg-[#0b1720] text-white/60 py-8 text-center text-xs tracking-widest border-t border-white/10">
        © {new Date().getFullYear()} ARCHAEO TRAILS. UNCOVERING HISTORY.
      </footer>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// export default function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // THEME COLOR: CHANGE THIS HEX CODE TO MATCH YOUR EXACT LOGO COLOR
//   const THEME_ACCENT = "#FFD050"; 

//   // Optimized Scroll Listener
//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       if (offset > 50) {
//         setIsScrolled((prev) => (!prev ? true : prev));
//       } else {
//         setIsScrolled((prev) => (prev ? false : prev));
//       }
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavClick = (sectionId) => {
//     setMobileMenuOpen(false);
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const element = document.getElementById(sectionId);
//         if (element) {
//           const headerOffset = 80;
//           const elementPosition = element.getBoundingClientRect().top;
//           const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
//           window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         }
//       }, 100);
//     } else {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         const headerOffset = 80;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
//         window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//       }
//     }
//   };

//   const isHomePage = location.pathname === "/";

//   return (
//     <div className="min-h-screen flex flex-col font-serif bg-[#0b1720]">
      
//       {/* --- SMART HEADER --- */}
//       <header 
//         className={`fixed top-0 w-full z-50 transition-[height,background-color,border] duration-500 ease-in-out border-b flex items-center ${
//           isScrolled 
//             ? "h-20 bg-[#0b1720]/95 backdrop-blur-md shadow-lg border-white/10" 
//             : "h-28 bg-transparent border-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          
//           {/* LOGO AREA - ARCHAEO TRAILS */}
//           <button onClick={() => handleNavClick("home")} className="group flex items-center gap-3">
//             {/* Logo Box - Uses Bright Theme Color */}
//             <div 
//               className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors duration-500 font-bold text-xl shadow-lg ${
//               isScrolled ? "text-[#0b1720]" : "bg-white/10 text-white backdrop-blur-md border border-white/20"
//               }`}
//               style={{ backgroundColor: isScrolled ? THEME_ACCENT : '' }}
//             >
//               AT
//             </div>
//             {/* Logo Text */}
//             <div className="text-left flex flex-col">
//               <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md leading-none">
//                 Archaeo Trails
//               </h1>
//               <span className={`text-[10px] tracking-[0.2em] uppercase font-medium mt-1 ${isScrolled ? 'text-[#FFD050]' : 'text-gray-300'}`}>
//                 Center for Heritage Learning
//               </span>
//             </div>
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex items-center gap-8">
//             {['About', 'Trails', 'Discover', 'Contact'].map((item) => (
//               <button 
//                 key={item}
//                 onClick={() => handleNavClick(item.toLowerCase())} 
//                 className="text-sm font-bold uppercase tracking-[0.15em] text-white hover:text-[#FFD050] transition-colors duration-300 relative group drop-shadow-sm"
//               >
//                 {item}
//                 <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#FFD050] transition-all duration-300 group-hover:w-full"></span>
//               </button>
//             ))}
            
//             {/* CTA Button */}
//             <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest border border-[#FFD050] bg-[#FFD050] text-[#0b1720] transition-all duration-300 hover:bg-white hover:border-white hover:text-[#0b1720] shadow-[0_0_15px_rgba(255,208,80,0.4)]">
//               Book A Trail
//             </button>
//           </nav>

//           {/* MOBILE MENU TOGGLE */}
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
//             <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
//           </button>
//         </div>

//         {/* MOBILE MENU DROPDOWN */}
//         <div className={`md:hidden absolute top-full left-0 w-full bg-[#0b1720] border-t border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
//            <div className="flex flex-col p-6 gap-4 text-white text-center">
//               {['About', 'Trails', 'Discover', 'Contact'].map((item) => (
//                 <button key={item} onClick={() => handleNavClick(item.toLowerCase())} className="py-2 hover:text-[#FFD050] uppercase tracking-widest font-bold">{item}</button>
//               ))}
//            </div>
//         </div>
//       </header>

//       <main className="flex-grow">
//         <div className={isHomePage ? "" : "pt-28"}> 
//             <Outlet /> 
//         </div>
//       </main>

//       <footer className="bg-[#0b1720] text-white/60 py-8 text-center text-xs tracking-widest border-t border-white/10">
//         © {new Date().getFullYear()} ARCHAEO TRAILS. UNCOVERING HISTORY.
//       </footer>
//     </div>
//   );
// }