import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GuardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
            
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    router.push("/auth/login");
                }
            }
        };

        fetchData();
    }, [router]);

    return (
        <main>
            {children}
        </main>
    );
}

async function getUser() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/user",
        {
            withCredentials:true,
        });
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
}
