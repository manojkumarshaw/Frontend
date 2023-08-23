import Layout from '@/components/layouts/layout';
import { fetcher } from '@/lib/api';
import { Spinner } from 'flowbite-react';
import { getSession, useSession } from "next-auth/react";
const qs = require('qs');
const Downloads = ({result}) => {

    const { data: session, status } = useSession();
    const jwtToken= session ? session.jwt : null;
    //console.log('props===',result);
    const baseurl = process.env.NEXT_PUBLIC_STRAPI;

    let downloadlist;
    if(result ===null){
        downloadlist = <Spinner />
    } else {
        downloadlist = Object.keys(result).map( (item)=>{
             // console.log('=======software==',software[item].plugins);
            const data = result[item].plugins;
            return data.length > 0 ? 
            <div className="md:w-auto"> 
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                 dark:text-gray-400" >
            <tr key={data.id}>
                <th scope="col" className="px-6 py-3 mx-2">
                CameoVersion Name
                </th>
                <th scope="col" className="px-6 py-3">
                    File Name
                </th>
                <th scope="col" className="px-6 py-3">
                    PluginVersion
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                
                <th scope="col" className="px-6 py-3">
                    File Path
                </th>

                <th scope="col" className="px-6 py-3">
                Type
                </th>
               
            </tr>
         </thead>
                {
                    data.map( (val)=> 
                    {
                        console.log("val============",val);
                        return(
                            <tr  className="bg-white border-b
                            dark:bg-gray-800 dark:border-gray-700" key={val.id}>
                                <td className="px-6 py-4">{val.CameoVersion}</td>
                                <td className="px-6 py-4">{val.FileName}</td>
                                <td className="px-6 py-4">{val.PluginVersion}</td>
                                <td className="px-6 py-4 hover:text-blue-600">
                                <a title={val?.File?.url} href={baseurl + val?.File?.url} download>Click to download</a>
                                </td>

                                <td className="px-6 py-4">{val?.File?.url}</td>
                                <td className="px-6 py-4">Laptop</td>

                            </tr>
                        );
                        
                        
                    })
                }
                
            </div>
            : <div className='container overflow-y-auto h-[10rem] sm:h-[26rem] text-lg font-medium'>Sorry , no Plugins records Founds</div>;
           })
    }
    return (
        <>
            <div className="container p-4 ">
                <figure  className="relative overflow-x-auto">
                    <table className="container overflow-y-auto h-[40rem] sm:h-[36rem] p-8 md:p-10 "> 
                        <tbody>
                        {
                           downloadlist   
                        }
                        </tbody>
                    </table>
                </figure ></div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const email = session ? session.user.email : null;
    const jwtToken = session ? session.jwt : null;
    const query = qs.stringify(
        {
            populate: ['plugins','plugins.File',],
            filters: {
                email: {
                        $eq: email,
                        }
              },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
            //filters[email][$eq]=${email}&populate[plugins][populate][0]=File
        const res =  await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users?${query}`, {
        //const res =  await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[email][$eq]=${email}&populate[plugins][populate][0]=File`, {
        method: 'GET',
        headers: { Authorization:`Bearer ${jwtToken}` }
        })
        const result =  await res;

    return {
        props: {
            result
        },
    };
}

export default Downloads
Downloads.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}