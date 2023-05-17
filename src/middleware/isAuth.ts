import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayloadType = {
    id: string;
};

export default function isAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // get token
    const token = req.header("Authorization");
    // return error if token is not provided
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayloadType;
        // add user to request
        req.user = decoded;
        // next middleware
        next();
    } catch (error: any) {
        // return error if token is invalid
        return res.status(401).json({ error: "Invalid token" });
    }
}
