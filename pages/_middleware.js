import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const baseUrl = process.env.NEXT_PUBLIC_REACT_URL;

export default function middleware(req) {
    const { cookies } = req;

    const token = cookies.token;
    const url = req.url;

    if (url.includes("/login") || url.includes("/registrationpage")) {
        console.log("login");
        if (jwt) {
            try {
                jwt.verify(token, process.env.JWT_SECRET_KEY);
                console.log("verify");
                return NextResponse.redirect(baseUrl + "/");
            } catch(err) {
                return NextResponse.next();
            }
        }
    }

    if (url.includes("/settings") || url.includes("/notifications")) {
        if (jwt) {
            try {
                jwt.verify(token, process.env.JWT_SECRET_KEY);
                return NextResponse.next();
            } catch(err) {
                return NextResponse.redirect(baseUrl + "/login");
            }
        } else {
            return NextResponse.redirect(baseUrl + "/login");
        }
    }

    return NextResponse.next();
}