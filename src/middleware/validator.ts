import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function validator(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            errors: {
                wrap: {
                    label: "",
                },
            },
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
}
