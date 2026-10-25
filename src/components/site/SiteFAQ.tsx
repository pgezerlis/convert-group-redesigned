import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/site/ui";
import { NavyRow, useNavy } from "@/components/site/NavySection";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteFAQ() {
  const state = useNavy();

  return (
    <section aria-labelledby="faq-heading" className={cn("section border-t border-border transition-colors duration-300", state.navy && "on-dark")}>
      <div className="container-cg">
        <NavyRow {...state} />
        <div className="mx-auto max-w-[880px]">
          <h2 id="faq-heading" className="mb-10 text-center !tracking-normal md:mb-14">FAQ</h2>
          <Accordion type="single" collapsible className="border-t border-navy">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border">
                <AccordionTrigger className="gap-6 py-6 text-lg font-medium text-navy hover:text-link hover:no-underline md:py-7 md:text-xl [&>svg]:size-5 [&>svg]:text-navy">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[72ch] pb-7 pr-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center text-muted-foreground">
            Can’t find your answer here?{" "}
            <ArrowLink to="/contact">Talk to Sales</ArrowLink>
          </p>
        </div>
      </div>
    </section>
  );
}
