import Layout from '@/components/layouts/layout';

const Help = () => {
    return (
        <>
        <h3 class="mb-3 text-xl font-medium text-gray-900">This section is not started yet ...</h3>
        </>
    );
}
export default Help;;
Help.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}