import clsx from "clsx";
import { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

export default function Avatar({ src, className, ...rest }: AvatarProps) {
    return (
        <img
            src={src}
            className={clsx("w-10 h-10 rounded-full", className)}
            {...rest}
        />
    );
}
