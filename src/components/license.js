import Layout from "@/components/layouts/layout";
import { Disclosure } from "@headlessui/react";
import { getSession, useSession } from "next-auth/react";
import moment  from "moment"; 
import { FaAngleUp } from "react-icons/fa";
import React from "react";
import Link from "next/link";
const qs = require('qs');
const License = ({ user }) => {

    let licenses = user.data;
    // const { data: session } = useSession();
   // console.log("🚀 ~ file: example.js:7 ~ CameoConnectorVersion ~ licenses", licenses);
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="rounded-lg p-4 lg:col-span-3">
                <h2 className="text-2xl font-bold mb-4">Issued Licenses</h2>
                <div className="container overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Mac ID/HostID (node/server)</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Start Date</th>
                                <th scope="col" className="px-6 py-3">End Date</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Type </th>
                                <th scope="col" className="px-6 py-3">issuedTo </th>
                                <th scope="col" className="px-6 py-3">LicenseFilename </th>

                            </tr>
                        </thead>
                        <tbody>

                       {licenses?.length > 0 ? 

                            licenses.map((item, index) => {
                                return (
                                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}>
                                        <td className="px-6 py-4"> {item.attributes.MacID_HostID_Node_Server}</td>
                                    
                                        <td className="px-6 py-4">{item.attributes.AWCVersion}</td>
                                        <td className="px-6 py-4">{moment(item.attributes.StartDate).format('MMMM Do YYYY')}</td>
                                        <td className="px-6 py-4">{moment(item.attributes.EndDate).format('MMMM Do YYYY')}</td>
                                        <td className="px-6 py-4">{item.attributes.Category}</td>
                                        <td className="px-6 py-4">{item.attributes.Type}</td>
                                        <td className="px-6 py-4">{item.attributes.issuedTo}</td>
                                        <td className="px-6 py-4"><Link href={process.env.NEXT_PUBLIC_STRAPI+item.attributes.LicenseFilename.data[0].attributes.url} download>Click to download</Link></td>
                                    </tr>);
                                })
                       
                       : <div className='container text-wx py-5 text-center dark:text-gray-400'>Sorry , no License records Founds</div>}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded-lg  p-4 lg:col-span-1">
                <Disclosure as="div" className="mt-2">  {({ open }) => (
                    <>              <Disclosure.Button className="flex w-full justify-between bg-gray-100 px-4 py-2 text-left text-sm 
            font-medium  hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500
             focus-visible:ring-opacity-75"> <span>Raise new license request</span>
                        <FaAngleUp
                            className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
                        /> </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col px-4 pt-4 pb-2 text-sm text-gray-500">
                            <Link   
                                className="mb-2 text-blue-600 hover:underline"
                                href="/license/trial-license-request">  Request a Trial License
                            </Link>                <Link
                                className="mb-2 text-blue-600 hover:underline"
                                href="/license/permanent-license-request"
                            >                  Request a Permanent License
                            </Link>                <Link
                                className="text-blue-600 hover:underline"
                                href="/license/trial-license-request"
                            >                  Renew Your License
                            </Link>              </Disclosure.Panel>
                    </>)}
                </Disclosure>
                <Disclosure as="div" className="mt-2">{({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between bg-gray-100 px-4 py-2 text-left text-sm font-medium  hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">                <span>All license requests</span>                <FaAngleUp
                            className={`${open
                                ? "rotate-180 transform  transition-transform delay-75 ease-in-out"
                                : ""
                                } h-5 w-5 transform  transition-transform delay-75 ease-in-out`}
                        />              </Disclosure.Button>              <Disclosure.Panel className="flex flex-col px-4 pt-4 pb-2 text-sm text-gray-500">                <Link className="text-lg" href="/license/trial-license-request">                  Trial License Request
                        </Link>
                            <Link href="/license/permanent-license-request">Permanent License Request</Link>
                            <Link href="/license/trial-license-request"> Renew License Request
                            </Link>
                        </Disclosure.Panel>
                    </>
                )}
                </Disclosure>
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const jwtToken = session ? session.jwt : null;
    
    const query = qs.stringify(
        {
            populate: '*',
            filters: {
                users_permissions_user: {
                    id: {
                        $eq: session?.id,
                      },
                }
              },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );

    ///licenses?populate[LicenseFilename][fields][0]=url&populate=users_permissions_user
    //populate=*&filters[$and][0][users_permissions_user][id][$eq]=15
    const USER = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/licenses?${query}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
    const user = await USER.json();

    return {
        props: {
            user,
        },
    };
}
License.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default License;