import React, { useState } from "react";
import { fetcher } from "@/lib/api";
import Blogs from "@/components/Blogs";
import Layout from "@/components/layouts/layout";
import useSWR from "swr";
import { getSession, useSession } from "next-auth/react";

const BlogsList = ({ blogs }) => {
    const { data: session } = useSession();
    console.log("🚀 ~ file: blogs.js:10 ~ BlogsList ~ session", session);

    const [pageIndex, setPageIndex] = useState(1);

    const { data } = useSWR(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?pagination[page]=${pageIndex}&pagination[pageSize]=3`,
        fetcher,
        {
            fallbackData: blogs,
        }
    );
    return (
        <div className="container overflow-y-auto  h-[40rem] sm:h-[36rem] ">

            <Blogs blogs={data} />
            <div className="flex justify-end">
                <button
                    className={`rounded p-2 py-2 text-white  md:p-2 ${pageIndex === 1 ? "bg-gray-300" : "bg-blue-600"
                        }`}
                    disabled={pageIndex === 1}
                    onClick={() => setPageIndex(pageIndex - 1)}
                >
                    {" "}
                    Previous
                </button>
                <button
                    className={`rounded p-2 py-2 text-white  md:p-2 ${pageIndex === (data && data.meta.pagination.pageCount)
                        ? "bg-gray-300"
                        : "bg-blue-600"
                        }`}
                    disabled={pageIndex === (data && data.meta.pagination.pageCount)}
                    onClick={() => setPageIndex(pageIndex + 1)}
                >
                    Next
                </button>
                <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount
                    }`}</span>
            </div>
        </div>
    );
};

export default BlogsList;

export async function getServerSideProps(context) {

    const session = await getSession(context);
    if (session == null) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        };
    }

    const blogsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?pagination[page]=1&pagination[pageSize]=3`
    );
    console.log("🚀 ~ file: blogs.js:69 ~ getServerSideProps ~ blogsResponse", blogsResponse);

    return {
        props: {
            blogs: blogsResponse,
            session
        },
    };
}


BlogsList.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
