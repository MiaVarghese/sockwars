export default function middleware(req) {
    const { cookies } = req;

    const jwt = cookies.token;
    console.log(jwt);
}