"use client";
import SlideProvider from "@/components/sliding/sliding-provider";
import SlideComponent from "@/components/sliding/slide-component";
import App from "@/components/sliding/slide-app";
export default function SlidePage() {
    return (
        <SlideProvider SlideComponent={SlideComponent}>
            <App />
        </SlideProvider>
    );
}
