import { ArrowDropDownCircleRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

export default function CustomAccordion({
  title,
  component,
}: {
  title: string;
  component: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircleRounded />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="shadow-md"
        >
          <Typography component="span">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="max-h-48 overflow-y-auto">
          {component}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
