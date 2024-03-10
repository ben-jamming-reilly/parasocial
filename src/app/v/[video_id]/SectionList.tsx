import Link from "next/link";

import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface SectionListProps {
  videoId: string;
  sections: string[];
}

export function SectionList({ sections, videoId }: SectionListProps) {
  return (
    <>
      {/* Mobile View */}
      <Accordion className="block sm:hidden" type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="flex flex-1 flex-row bg-black px-3 py-1 font-bold tracking-widest text-white">
            uploads
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <ScrollArea className="max-h-[40vh] gap-3 ">
              <div className="flex flex-col gap-3 text-white">
                {sections.map((section) => (
                  <Link href={`/v/${videoId}#${section}`}>{section}</Link>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="mb-3 px-3">
          <h3 className="max-w-fit bg-black px-3 font-bold tracking-widest text-white">
            uploads
          </h3>
        </div>
        <ScrollArea className="h-[50vh] ">
          <div className="flex flex-col gap-3 text-sm text-white  lg:text-base">
            {sections.map((section) => (
              <Link href={`/v/${videoId}#${section}`}>{section}</Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
