import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        // You can add specific blog schema markup or layout wrappers here
        <>
            {children}
        </>
    );
}
