import Document from "@/components/Document";

async function Docpage({params} : {
    params : Promise<{id: string}>
}) {

    const {id} = await params;
    return (
        <Document id = {id} />
    )
}
export default Docpage