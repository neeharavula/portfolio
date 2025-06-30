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
      <>
        <p>blah blah</p>

        <Image
          src="/images/melodics/userflow.png"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />

        <p>blah blah blah</p>

        <div className="my-6 aspect-video w-full max-w-[800px]">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://embed.figma.com/proto/Km3IVKxY8c88kSVnJC26kP/Melodics?node-id=1-4&starting-point-node-id=1%3A4&embed-host=share"
            allowFullScreen
          ></iframe>
        </div>
      </>
    ),
    reflections: <p>blah blah blah blah blah</p>,
  },
  {
    slug: "tech4good",
    title: "Tech4Good / Causeway",
    type: "Lab",
    date: "Spring 2023",
    tools: ["javascript", "html", "css", "angular", "stackblitz"],
    overview: <p>blah blah blah</p>,
    tasks: (
      <>
        <p>blah blah</p>

        <Image
          src="/images/tech4good/ide1.png"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />

        <p>blah blah blah</p>

        <Image
          src="/images/tech4good/ide2.gif"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />
      </>
    ),
    reflections: <p>blah</p>,
  },
  {
    slug: "general-atomics",
    title: "General Atomics Aeronautical",
    type: "Internship",
    date: "Summer 2022",
    tools: ["python"],
    overview: <p>blah blah blah</p>,
    tasks: <p>blah blah</p>,
    reflections: <p>blah blah</p>,
  },
  {
    slug: "athenahacks",
    title: "AthenaHacks / USC SOS",
    type: "Hackathon",
    date: "Spring 2021",
    tools: ["javascript", "html", "css", "twilio"],
    overview: (
      <p>
        For <strong>USC's AthenaHacks</strong> hackathon, I worked in a team of
        four to develop <strong>USC SOS</strong>, a service that provides users
        with a hub of various emergency contacts at USC at their fingertips. USC
        is located near South Los Angeles, Inglewood, and Watts— cities known
        for their high crime and gang rates. While USC offers various services
        to students who may encounter emergencies off campus, in a life or death
        situation, it can be hard to quickly find the right person to call for
        help. <strong>USC SOS</strong> makes it easy to get connected quickly by
        providing a place for all important emergency contacts at just a click
        or call away.
      </p>
    ),
    tasks: (
      <p>
        I worked on developing the flow control and voice functions of our
        application using <strong>Twilio Console Studio</strong>, using
        interactions such as split based on dial or speech and connect call to.
        We linked our Twilio flow chart to our mobile user interface using{" "}
        <strong>React-Native</strong> and published the application through the{" "}
        <strong>Expo-CLI</strong> framework.
        <Image
          src="/images/athenahacks/uscsos1.png"
          alt="Twilio flow chart"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />
      </p>
    ),
    reflections: (
      <p>
        As a first-time hacker, I found the experience to be both challenging
        and incredibly rewarding. It was fun to work with friends and leverage
        each of our unique abilities to produce a tangible, working result in
        just 24 hours!
      </p>
    ),
  },
];
