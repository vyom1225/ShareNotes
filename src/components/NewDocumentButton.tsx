"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDocument } from "@/actions/actions";
function NewDocumentButton() {

    const [isPending ,startTransition] = useTransition();
    const router = useRouter();

    const handleCreateNewDocument = () => {
        startTransition(async () => {
            const {docId} = await createNewDocument();
            router.push(`/doc/${docId}`);
        });
    }
  return (
        <Button onClick={handleCreateNewDocument} disabled={isPending} className="mt-8 md:mt-0">
            {isPending ? "Creating..." : "New Document"}
        </Button>
  )
}
export default NewDocumentButton