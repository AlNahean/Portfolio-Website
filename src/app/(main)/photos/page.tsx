import Image from "next/image";
import { Metadata } from "next";
import { photoCollection } from "@/data/photos";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
    GridBody,
    DraggableContainer,
    GridItem,
} from "@/components/infinite-drag-scroll";



export const metadata: Metadata = {
    title: "Photos",
    description: "A collection of photographs.",
};

export default function PhotosPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <DemoOne />
        </div>
    );
}




const images = [
    {
        id: 1,
        alt: "Silhouette of a traditional Japanese pagoda at sunset",
        src: "https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        alt: "Himeji Castle on a clear day",
        src: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        alt: "Red Car",
        src: "https://images.unsplash.com/photo-1536901766856-5d45744cd180?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxqYXBhbnxlbnwwfDF8MHx8fDA%3D",
    },
    {
        id: 4,
        alt: "Woman in kimono standing beside a traditional Japanese house",
        src: "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        alt: "Group of men in black suits inside a hallway",
        src: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        alt: "Crowd walking through a street decorated with red lanterns",
        src: "https://images.unsplash.com/photo-1596713109885-c94bdfd7f19d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        alt: "Timelapse of traffic lights and buildings at night",
        src: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        alt: "Close-up of orange and black wooden torii gate posts",
        src: "https://images.unsplash.com/photo-1585028281328-54ec883cd7cf?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 9,
        alt: "Historic building with brown and white stone exterior in daylight",
        src: "https://images.unsplash.com/photo-1614003024056-e3ecbf8888f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 10,
        alt: "Lantern glowing on a quiet street at night",
        src: "https://images.unsplash.com/photo-1573455494057-12684d151bf4?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 11,
        alt: "View of Osaka Castle with clear sky backdrop",
        src: "https://images.unsplash.com/photo-1575489129683-4f7d23379975?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 12,
        alt: "Pagoda silhouetted during golden hour",
        src: "https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 13,
        alt: "Himeji Castle seen from a distance",
        src: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 14,
        alt: "Torii gate pillars in vibrant orange and black",
        src: "https://images.unsplash.com/photo-1585028281328-54ec883cd7cf?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 15,
        alt: "Traditional Japanese home under daylight",
        src: "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 16,
        alt: "Women wearing kimono beside wooden house",
        src: "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 17,
        alt: "People passing under hanging red lanterns at dusk",
        src: "https://images.unsplash.com/photo-1596713109885-c94bdfd7f19d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 18,
        alt: "Stepping stone path winding through lush forest",
        src: "https://plus.unsplash.com/premium_photo-1673285285994-6bfff235db97?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const DemoOne = () => {
    return (
        <DraggableContainer variant="masonry">
            <GridBody>
                {images.map((image, index) => (
                    <GridItem
                        key={image.id}
                        className="relative h-54 w-36 md:h-96 md:w-64"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="pointer-events-none absolute h-full w-full object-cover"

                        />
                    </GridItem>
                ))}
            </GridBody>
        </DraggableContainer>
    );
};