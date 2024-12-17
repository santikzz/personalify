import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

export const useAlertDialog = () => {

    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: "Alert",
        description: "Something happend",
        actionText: "OK",
        onAction: () => { }
    });

    const showDialog = (content: {
        title?: string;
        description?: string;
        actionText?: string;
        onAction?: () => void;
    }) => {
        setDialogContent({
            title: content.title || "Alert",
            description: content.description || "Something happend",
            actionText: content.actionText || "OK",
            onAction: content.onAction || (() => { }),
        });
        setOpen(true);
    };

    const AlertDialogComponent = () => (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogContent.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel> */}
                    <AlertDialogAction onClick={() => {
                        dialogContent.onAction();
                        setOpen(false);
                    }}>
                        {dialogContent.actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return { showDialog, AlertDialogComponent };
}