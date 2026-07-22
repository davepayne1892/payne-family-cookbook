import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

type ShoppingListDisplayProps = {
  shoppingList: string;
};

export function ShoppingListDisplay({
  shoppingList,
}: ShoppingListDisplayProps) {
  const { toast } = useToast();
  const listRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(shoppingList);
    toast({
      title: "Copied to clipboard!",
      description: "Your shopping list is ready to be pasted.",
    });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && listRef.current) {
        printWindow.document.write('<html><head><title>Shopping List</title>');
        printWindow.document.write('<style>body { font-family: sans-serif; } ul { list-style-type: none; padding-left: 0; } li { margin-bottom: 0.5rem; } </style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Shopping List</h1>');
        const listHtml = listRef.current.innerHTML.replace(/- /g, '<li>').replace(/\n/g, '</li>');
        printWindow.document.write(`<ul>${listHtml}</ul>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
  };


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">Your Shopping List</h3>
      <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted/20">
        <pre ref={listRef} className="text-sm whitespace-pre-wrap font-sans">
            {shoppingList}
        </pre>
      </ScrollArea>
      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy List
        </Button>
        <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
        </Button>
      </div>
    </div>
  );
}
