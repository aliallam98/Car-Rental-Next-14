import Section from "@/components/Section";
import { faq } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const FAQ = faq;
  return (
    <Section className="text-center">
      <h2 className="text-xl md:text-2xl lg-text-3xl font-semibold my-4">
        FAQ
      </h2>
      <p className="text-muted-foreground text-lg">
        frequently asked questions
      </p>
      <div className="container max-w-[1000px] mt-20">
        {FAQ.map((item, i) => (
          <Accordion type="multiple" key={i}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="font-medium text-lg text-muted-foreground text-start">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </Section>
  );
};

export default FAQSection;
