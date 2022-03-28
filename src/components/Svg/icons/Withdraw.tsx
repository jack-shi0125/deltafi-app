import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
    isDark: boolean;
    isSelected: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, isSelected, ...props }) => {
    const textColor = isSelected ? isDark ? "#FFFFFF" : "#23242F" : "#88809C";
    const opacity = isDark ? 1.0 : 0.8
    return (
        <Svg viewBox="0 0 17 17" {...props}>
            <path d="M5.75 2.24999V3.74999H2V14.25H14V7.49999H15.5V15C15.5 15.1989 15.421 15.3897 15.2803 15.5303C15.1397 15.671 14.9489 15.75 14.75 15.75H1.25C1.05109 15.75 0.860322 15.671 0.71967 15.5303C0.579018 15.3897 0.5 15.1989 0.5 15V2.99999C0.5 2.80108 0.579018 2.61031 0.71967 2.46966C0.860322 2.32901 1.05109 2.24999 1.25 2.24999H5.75ZM13.2125 3.74999L11 1.53749L12.0605 0.47699L16.0655 4.48199C16.1284 4.54492 16.1711 4.62507 16.1885 4.71231C16.2058 4.79955 16.1969 4.88997 16.1629 4.97214C16.1288 5.05432 16.0712 5.12457 15.9973 5.17403C15.9234 5.22348 15.8364 5.24991 15.7475 5.24999H9.5C9.10218 5.24999 8.72064 5.40802 8.43934 5.68933C8.15804 5.97063 8 6.35217 8 6.74999V11.25H6.5V6.74999C6.5 5.95434 6.81607 5.19128 7.37868 4.62867C7.94129 4.06606 8.70435 3.74999 9.5 3.74999H13.2125Z" fill={textColor} opacity={opacity} />
        </Svg>
    );
};

export default Icon;