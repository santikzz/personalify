import { ring } from 'ldrs';
ring.register();

interface LoaderProps {
    size?: number;
    stroke?: number;
    bgOpacity?: number;
    speed?: number;
    color?: string;
}

export const Loader = ({
    size = 40,
    stroke = 5,
    bgOpacity = 0.0,
    speed = 2,
    color = '#000000'
}: LoaderProps) => {
    return (
        <l-ring
            size={size}
            stroke={stroke}
            bg-opacity={bgOpacity}
            speed={speed}
            color={color}
        ></l-ring>
    )
};