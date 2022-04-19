import { useEffect, useState } from "react";

function getWindowDimensionsWithScrollbar() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width, height
    };
}

export default function useWindowDimensionsWithScrollbar() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensionsWithScrollbar()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensionsWithScrollbar());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}