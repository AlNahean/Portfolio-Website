export interface Photo {
  id: string;
  src: string;
  alt: string; // Keep alt for accessibility/SEO
}

export const photoCollection: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop",
    alt: "Mountain Landscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=3506&auto=format&fit=crop",
    alt: "Golden Hour Field",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1449824913929-79ae76035d75?q=80&w=3506&auto=format&fit=crop",
    alt: "Urban Architecture",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3506&auto=format&fit=crop",
    alt: "Yosemite Waterfall",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3506&auto=format&fit=crop",
    alt: "Coastal Waves",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=3348&auto=format&fit=crop",
    alt: "Forest Mist",
  },
];