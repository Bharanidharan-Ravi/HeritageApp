import React, { useState } from "react";

// --- MOCK DATA (Using the Unsplash links provided earlier) ---
const GALLERY_DATA = [
  { id: 1, title: "Sunset at Fort", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400" },
  { id: 2, title: "Ancient Arch", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400" },
  { id: 3, title: "Stone Carvings", image: "https://images.unsplash.com/photo-1582564286939-400a311013a2?auto=format&fit=crop&w=400" },
  { id: 4, title: "Market Chaos", image: "https://images.unsplash.com/photo-1541436402096-3c00438a0c25?auto=format&fit=crop&w=400" },
];

const STORIES_DATA = [
  { id: 1, name: "Sarah J.", rating: 5, text: "I lived here for 10 years but never knew this alley existed!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100" },
  { id: 2, name: "Amit V.", rating: 4, text: "Great walk, but wear comfortable shoes. The history is mind-blowing.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100" },
  { id: 3, name: "Chen L.", rating: 5, text: "The best way to see the city. Loved the food stops!", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100" },
];

const SHOP_DATA = [
  { id: 1, name: "Vintage Map", price: "₹1200", image: "https://images.unsplash.com/photo-1526772662000-3f88f107f611?auto=format&fit=crop&w=300" },
  { id: 2, name: "Clay Pot", price: "₹850", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300" },
  { id: 3, name: "Postcards (Set)", price: "₹250", image: "https://images.unsplash.com/photo-1583306346215-055ea5025d2c?auto=format&fit=crop&w=300" },
  { id: 4, name: "Heritage Tee", price: "₹600", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300" },
];

export default function Discover() {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <section className="py-24 bg-[#0b1720] text-white relative">
      
      {/* 1. Header Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <span className="text-[#FFD050] font-sans font-bold tracking-[0.2em] uppercase text-xs">
          Community & Culture
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-medium mt-4 text-white">
          Discover More
        </h2>
        
        {/* TABS (Switcher) */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['gallery', 'stories', 'shop'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeTab === tab 
                  ? "bg-[#FFD050] text-[#0b1720] border-[#FFD050]" 
                  : "bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="max-w-7xl mx-auto px-6 min-h-[400px]">
        
        {/* VIEW: GALLERY */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
            {GALLERY_DATA.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <p className="text-white font-serif font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
            {/* Upload Button */}
            <div className="flex items-center justify-center border-2 border-dashed border-[#FFD050]/30 rounded-lg aspect-[3/4] hover:bg-[#FFD050]/10 cursor-pointer transition-colors group">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FFD050] text-[#0b1720] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFD050]">Upload Yours</span>
                </div>
            </div>
          </div>
        )}

        {/* VIEW: STORIES (Testimonials) */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            {STORIES_DATA.map((story) => (
              <div key={story.id} className="bg-[#15202b] p-8 rounded-xl border border-white/5 hover:border-[#FFD050]/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD050]" />
                  <div>
                    <h4 className="text-white font-bold">{story.name}</h4>
                    <div className="text-[#FFD050] text-xs">{"⭐".repeat(story.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed mb-4">"{story.text}"</p>
                <span className="inline-block bg-[#1a2d3a] text-[#FFD050] text-[10px] font-bold px-2 py-1 rounded">
                   ✔ Verified Walker
                </span>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: SHOP */}
        {activeTab === "shop" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up">
            {SHOP_DATA.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden group">
                <div className="h-48 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                   <h4 className="text-[#0b1720] font-bold font-serif text-lg">{item.name}</h4>
                   <p className="text-[#FFD050] font-bold my-2">{item.price}</p>
                   <button className="w-full py-2 bg-[#0b1720] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#FFD050] hover:text-[#0b1720] transition-colors">
                     Add to Cart
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}