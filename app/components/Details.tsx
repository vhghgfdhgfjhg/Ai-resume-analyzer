import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordian";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 6.9
          ? "bg-badge-green"
          : score > 3.9
          ? "bg-badge-yellow"
          : "bg-badge-red"
      )}
    >
      <img
        src={score > 6.9 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 6.9
            ? "text-badge-green-text"
            : score > 3.9
            ? "text-badge-yellow-text"
            : "text-badge-red-text"
        )}
      >
        {score}/10
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// ✔ FIXED: Supports array of plain strings
const CategoryContent = ({
  tips,
  variant,
}: {
  tips?: string[];
  variant: "strength" | "weakness" | "suggestion" | "ats";
}) => {
const selftips = tips ?? [];
const colors = {
    strength: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: "/icons/check.svg",
    },
    weakness: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: "/icons/warning.svg",
    },
    suggestion: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      icon: "/icons/info.svg",
    },
    ats: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: "/icons/bolt.svg",
    },
  };

  const style = colors[variant];
{console.log(selftips)}
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {selftips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img src={style.icon} alt="icon" className="size-5" />
            <p className="text-xl text-gray-600">{tip}</p>
          </div>
        ))}
      </div> */}

      <div className="flex flex-col gap-4 w-full">
        {selftips.map((tip, index) => (
          <div
            key={index + tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              style.bg,
              style.border,
              style.text
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img src={style.icon} alt="icon" className="size-5" />
              <p className="text-xl font-semibold">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>

        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.format_and_design}
            />
          </AccordionHeader>

          <AccordionContent itemId="tone-style">
            <CategoryContent
              tips={feedback.detailed_feedback.strengths}
              variant="ats"
            />
            
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content_quality}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent
              tips={feedback.detailed_feedback.ats_optimization_tips}
              variant="strength"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.format_and_design}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent
              tips={feedback.detailed_feedback.suggestions}
              variant="suggestion"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.match_to_job}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent
              tips={feedback.detailed_feedback.weaknesses}
              variant="weakness"
            />
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
};


export default Details;
