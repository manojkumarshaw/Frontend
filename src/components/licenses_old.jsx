import Layout from '@/components/layouts/layout';
import { getSession } from "next-auth/react";


const Licenses = ({user}) => {
  
   console.log(user);
   let array = user.data;
   let baseurl= '';
    return (
        <>
        <h3 class="mb-3 text-xl font-medium text-gray-900 dark:text-white">Licence Details</h3>
        <div className="md:w-auto"> 
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 mx-2">
                MacID HostID Node Server
                </th>
                <th scope="col" className="px-6 py-3">
                Mac ID
                </th>
                <th scope="col" className="px-6 py-3">
                StartDate
                </th>
                <th scope="col" className="px-6 py-3">
                End Date
                </th>
                <th scope="col" className="px-6 py-3">
                Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Licence File
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
               
            </tr>
         </thead>
       
         {
         array.map( item => 
         {
          return item.attributes.AWCVersion.length > 0 ?

        
          <tr key={item.id} className="bg-white border-b
                            dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {item.attributes.MacID_HostID_Node_Server} 
                                </td>
                                <td className="px-6 py-4">
                                    {item.attributes.MacID}
                                </td>
                                
                                <td className="px-6 py-4">
                                    {item.attributes.StartDate}
                                </td>

                                <td className="px-6 py-4">
                                    {item.attributes.EndDate}
                                </td>

                                <td className="px-6 py-4">
                                    {item.attributes.Category}
                                </td>
                                
                                <td className="px-6 py-4">
                                    {item.attributes.Type}
                                </td>
                                <td className="px-6 py-4 hover:text-blue-600">
                                <a title={item?.attributes?.LicenseFilename?.url} href={baseurl + item?.attributes?.LicenseFilename?.url} download>Click to download</a>
                                </td>
                                <td className="px-6 py-4">
                                  Laptop
                                </td>

                            </tr> :
          <div> <h1>No records Founds</h1></div>
         }

         
         )}

</div>
        </>
    );
}

export default Licenses;
Licenses.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

  export async function getServerSideProps(context) 
  { 

    const session = await getSession(context);
    const jwtToken= session ? session.jwt : null;
    // const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/licenses?populate[LicenseFilename][fields][0]
    // =url&populate=users_permissions_user`)

    const USER =  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/licenses?populate[LicenseFilename][fields][0]=url&populate=users_permissions_user`, {
      method: 'GET',
      headers: { Authorization:`Bearer ${jwtToken}` }
    })
    const user =  await USER.json();

    return {
      props: {
        user,
      },
    };
}
  