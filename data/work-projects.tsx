// app/data/work-projects.tsx
import { ReactNode } from "react";
import Image from "next/image";

export type WorkProject = {
  slug: string;
  title: string;
  type: string;
  date: string;
  tools: string[];
  overview?: ReactNode;
  tasks?: ReactNode;
  reflections?: ReactNode;
};

export const workData: WorkProject[] = [
  {
    slug: "northwestern-mutual",
    title: "Northwestern Mutual",
    type: "Internship",
    date: "Summer 2023",
    tools: ["javascript", "postman", "mysql", "aws"],
    overview: (
      <>
        <p>
          <strong>Northwestern Mutual (NM)</strong> is a financial services and
          life insurance company headquartered in Milwaukee, WI. In the summer
          of 2023, I interned on the <strong>Client Communications</strong> team
          within NM’s Engineering Solutions Delivery division. Our team was
          responsible for building and maintaining the communication pipelines
          used by over 10,000 financial representatives, supporting the delivery
          of contracts, statements, billing notices, and digital messages (such
          as email and SMS) to clients nationwide.
        </p>
      </>
    ),
    tasks: (
      <>
        <p>
          During the internship, I contributed to the development and testing of
          dynamic, data-driven communication templates used for client-facing
          emails and documents. I worked closely with other engineers on my team
          to simulate full delivery workflows and ensure each message was
          accurate, accessible, and properly formatted before reaching users.
        </p>
        <br />
        <p>
          Each communication involved working through the following process:
        </p>
        <br />
        <ul className="list-disc list-inside ml-8 space-y-1 mt-2">
          <li>
            <strong>Developing the template:</strong> Built reusable
            JavaScript-based modules for digital communications (email or PDF)
            according to stakeholder requirements
          </li>
          <br />
          <li>
            <strong>Payload simulation and testing:</strong> Used Postman to
            simulate API calls for communication jobs, and populated data
            payloads with client-specific data from MySQL Workbench.
          </li>
          <br />
          <li>
            <strong>Rendering and output generation:</strong> Rendered outputs
            via Quadient Inspire, uploaded outputs to Amazon S3, and tested
            delivery through Microsoft Outlook to review lyaout, content
            accuracy, and formatting.
          </li>
          <br />
          <li>
            <strong>Iteration and debugging:</strong> Used DynamoDB to trace
            message delivery events across pipeline and fixed layout or logic
            issues in template code
          </li>
        </ul>
      </>
    ),
    reflections: (
      <p>
        Working on the Client Communications team opened my eyes to the
        complexity of large-scale communication systems and the importance of
        data accuracy, accessibility, and thoughtful content design in financial
        messaging. It was an awesome opportunity to work with and learn from a
        team of talented engineers in the fintech sector, and also experience my
        first Midwestern summer!
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 my-6">
          <Image
            src="/images/nm/nm1.jpg"
            alt="Northwestern Mutual building"
            width={800}
            height={450}
            className="rounded-lg my-6"
          />
          <Image
            src="/images/nm/nm2.jpg"
            alt="View from UWM"
            width={800}
            height={450}
            className="rounded-lg my-6"
          />
          <Image
            src="/images/nm/nm3.jpg"
            alt="Milwaukee Art Museum"
            width={800}
            height={450}
            className="rounded-lg my-6"
          />
          <Image
            src="/images/nm/nm4.jpg"
            alt="Summerfest"
            width={800}
            height={450}
            className="rounded-lg my-6"
          />
        </div>
      </p>
    ),
  },
  {
    slug: "melodics",
    title: "Melodics",
    type: "Project",
    date: "Spring 2023",
    tools: ["figma"],
    overview: <p>blah blah blah</p>,
    tasks: (
      <p>
        blah blah
        <Image
          src="/images/northwestern-mutual/pipeline.png"
          alt="Client communication pipeline diagram"
          width={800}
          height={450}
          className="rounded-xl shadow-md my-6"
        />
      </p>
    ),
  },
  {
    slug: "tech4good",
    title: "Tech4Good / Causeway",
    type: "Lab",
    date: "Spring 2023",
    tools: ["javascript", "angular", "stackblitz"],
    overview: <p>blah blah blah</p>,
    tasks: <p>blah blah</p>,
  },
  {
    slug: "general-atomics",
    title: "General Atomics Aeronautical",
    type: "Internship",
    date: "Summer 2022",
    tools: ["python"],
    overview: <p>blah blah blah</p>,
    tasks: <p>blah blah</p>,
  },
  {
    slug: "athenahacks",
    title: "AthenaHacks / USC SOS",
    type: "Hackathon",
    date: "Spring 2021",
    tools: ["javascript", "twilio"],
    overview: <p>blah blah blah</p>,
    tasks: <p>blah blah</p>,
  },
];
