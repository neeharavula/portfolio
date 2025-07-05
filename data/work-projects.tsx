// app/data/work-projects.tsx
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

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
          of 2023, I interned on a <strong>Client Communications</strong> team
          within NM&apos;s Engineering Solutions Delivery division. Our team was
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
          accurate, accessible, and properly formatted before reaching viewers.
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
            delivery through Microsoft Outlook to review layout, content
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
        Working on the <strong>Client Communications</strong> team opened my
        eyes to the complexity of large-scale communication systems and the
        importance of data accuracy, accessibility, and thoughtful content
        design in financial messaging. It was an awesome opportunity to work
        with and learn from a team of talented engineers in the fintech sector,
        and also experience my first Midwestern summer!
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
    overview: (
      <>
        <p>
          For a UX class at UC Santa Cruz, I worked with a team of 5 to design{" "}
          <strong>Melodics</strong>, a collaborative music producing platform.
          Much of the music producing software and applications available today
          often have overwhelming interfaces and a tough learning curve which
          can be discouraging for aspiring producers. Additionally, experienced
          music producers have limited avenues to safely share their music in
          production stages and obtain valuable feedback.{" "}
          <strong>Melodics</strong> solves these problems by
        </p>
        <ul className="list-disc list-inside ml-8 space-y-1 mt-2">
          <li>Lowering barriers to entry for beginners, and</li>
          <li>
            Enabling collaboration and quick iteration directly on music stems
          </li>
        </ul>
      </>
    ),
    tasks: (
      <>
        <p>
          <strong>User Research:</strong> To better understand how to help both
          beginner and experienced music producers, we surveyed people from
          different backgrounds and asked questions centered around emotions:
        </p>
        <ul className="list-disc list-inside ml-8 space-y-1 mt-2">
          <li>What do you feel during your process of making music?</li>
          <li>
            What challenges have you encountered while attempting to make music?
          </li>
        </ul>
        <br />
        <p>
          The survey revealed that beginners felt they lacked the ability,
          motivation, and time to learn complex production tools, while
          experienced producers felt that music production feels more like
          ‘work’, and not the enjoyable, creative pursuit it used to be.
        </p>

        <br />
        <p>
          <strong>Ideation & Planning:</strong> From our findings, we
          established a clear goal for <strong>Melodics</strong>: a playful,
          minimal production environment for new and seasoned music producers
          alike, where music-making is less of solo journey and more of a
          collaborative experience. To accomplish these goals, we created{" "}
          <strong>user personas</strong> to represent sentiments of our survey
          respondents, brainstormed features in <strong>FigJam</strong>, and
          composed a <strong>user flow diagram</strong> encompassing all of the
          possible actions the user can take, from creating an account to
          revising a music stem based on feedback received from other users.
        </p>

        <Image
          src="/images/melodics/userflow.png"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />

        <p>
          <strong>Design & Usability Testing:</strong> From there, we sketched
          key frames onto paper, determined the color, font, and organizational
          schemes that best adhered to our goals, and finally turned our
          low-fidelity prototypes into a high-fidelity, interactive prototype
          with <strong>Figma</strong>, ready for usability testing. Using our
          participants&apos; feedback, we iterated upon our prototype until we
          achieved a final design that satisfied our goals and requirements.
          Some improvements included redesigning our mascot (Mozart the Frog) to
          provide usage tips and enhance the user experience, and adjusting our
          fonts and icons to be more consistent and pleasing to the eye.
        </p>

        <div className="my-6 aspect-video w-full max-w-[800px]">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://embed.figma.com/proto/Km3IVKxY8c88kSVnJC26kP/Melodics?node-id=1-4&starting-point-node-id=1%3A4&embed-host=share"
            allowFullScreen
          ></iframe>
        </div>
      </>
    ),
    reflections: (
      <p>
        As a music and design lover, <strong>Melodics</strong> was easily one of
        my most favorite projects from my undergraduate career. Working through
        and understanding the <strong>UI/UX design</strong> process has
        fundamentally changed the way I develop software and applications, and
        taught me to always approach problems from a user/stakeholder
        standpoint. Since then, <strong>Figma</strong> has been a staple in
        personal design and development process.
      </p>
    ),
  },
  {
    slug: "tech4good",
    title: "Tech4Good / Causeway",
    type: "Lab",
    date: "Spring 2023",
    tools: ["javascript", "html", "css", "angular", "stackblitz"],
    overview: (
      <p>
        <strong>UC Santa Cruz&apos;s Tech4Good Lab</strong> is a research and
        social computing organization dedicated to helping individuals and
        communities to thrive in work and education. During my time at the lab,
        I worked on the <strong>APIs and Frameworks</strong> team where I was
        involved in developing <strong>Causeway</strong>, an educational web app
        designed to provide web dev tutorials for students and new lab members
        through streamlined learning pathways, project hierarchies, mentorship,
        and collaboration.
      </p>
    ),
    tasks: (
      <>
        <p>
          I worked on improving the user experience of <strong>Causeway</strong>{" "}
          to encourage hands-on and interactive learning. This involved
          developing and integrating several new core features:
        </p>

        <ul className="list-disc list-inside ml-8 space-y-1 mt-2">
          <br />
          <li>
            <strong>Code editor and live output:</strong> Using JavaScript and
            HTML, my teammate and I created two new components, an Editor pane
            for writing and saving code, and a dynamic Output pane to display
            the results of the code. We used the{" "}
            <strong>Stackblitz WebContainer API</strong>, which offers a
            browser-based runtime environment for executing applications and
            operating system commands, along with <strong>CodeMirror</strong> to
            achieve this functionality, and imported a basic{" "}
            <strong>Express JS</strong> app into the{" "}
            <strong>WebContainer</strong> to test our code.
          </li>
          <Image
            src="/images/tech4good/ide1.png"
            alt="User flow diagram"
            width={800}
            height={450}
            className="rounded-lg my-6"
          />
          <li>
            <strong>Terminal:</strong> In order to perform actions like
            installing dependencies or running commands, we embeded a Terminal
            pane using <strong>Xterm.js</strong> and created a button to easily
            toggle between the Terminal and Output for a better user experience.
          </li>
          <br />
          <li>
            <strong>File System Pane:</strong> Lastly, we use the{" "}
            <strong>Angular</strong>{" "}
            <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
              mat-tree
            </code>{" "}
            component to create a file system pane UI, which involved
            recursively traversing through the directories with the{" "}
            <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
              readdir
            </code>{" "}
            function and updating the code editor based on selected files.
          </li>
        </ul>

        <Image
          src="/images/tech4good/ide2.gif"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />
      </>
    ),
    reflections: (
      <>
        <p>
          Coming from very little frontend development experience, I learned a
          ton about developing with APIs, choosing frameworks and integrating
          components, and turning requirements into tangible results in a matter
          of weeks. It was awesome to be a part of{" "}
          <strong>Tech4Good&apos;s</strong> mission, contribute to{" "}
          <strong>Causeway&apos;s</strong> beginnings, and create the foundation
          for future developers and lab members to iterate upon our work!
        </p>
        <br />
        <Link
          href="https://ucsc-ospo.github.io/project/osre24/ucsc/causeway/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-[#94A75D]"
        >
          <p>
            Learn more about Causeway from Tech4Good Director and UCSC Professor
            David Lee
          </p>
        </Link>
      </>
    ),
  },
  {
    slug: "general-atomics",
    title: "General Atomics Aeronautical",
    type: "Internship",
    date: "Summer 2022",
    tools: ["python"],
    overview: (
      <>
        <p>
          <strong>General Atomics Aeronautical Systems (GA-ASI)</strong> is
          defense company based in San Diego, CA, leading the development and
          manufacturing of{" "}
          <strong>unmanned aircraft and mission systems</strong>. During the
          summer of 2022, I worked as a{" "}
          <strong>Software Developer Intern</strong> on a{" "}
          <strong>Modeling and Simulation</strong> team, responsible for the
          development and delivery of flight-critical simulation software.
        </p>
        <Image
          src="/images/ga/mq9b.jpg"
          alt="User flow diagram"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />
      </>
    ),
    tasks: (
      <>
        <p>
          My team utilized an application called <strong>AVSim</strong> to
          simulate the flight of unmanned aircrafts with real-time aircraft
          telemetry data (ex: latitude, longitude, fuel). <strong>AVSim</strong>{" "}
          communicates the telemetry data via UDP messaging to other
          applications or to a physical ground station computer itself to
          simulate flight.
        </p>
        <br />
        <p>
          One fallback of <strong>AVSim</strong>, however, was that it did not
          offer a way to see what data it was sending out to other
          apps/computers. I addressed this issue by developing a{" "}
          <strong>monitor application</strong> that could be used in conjunction
          with <strong>AVSim</strong> to allow developers or ground station
          pilots to easily examine the telemetry data being generated by AVSim,
          and quickly identify and troubleshoot errors that may be affecting
          aircraft behavior.
        </p>
        <Image
          src="/images/ga/station.jpg"
          alt="Ground control station"
          width={800}
          height={450}
          className="rounded-lg my-6"
        />
        <p>
          To accomplish this task, I worked though the entire
          <strong> Software Development Life Cycle (SDLC)</strong>, which
          involved:
        </p>
        <br />
        <ul className="list-disc list-inside ml-8 space-y-1 mt-2">
          <li>Establishing technical and functional requirements</li>
          <br />
          <li>
            Identifying potential use cases and error-handling based on{" "}
            <strong>Interface Control Documentation (ICDs)</strong>
          </li>
          <br />
          <li>
            Creating wireframes/mockups of the monitor&apos;s{" "}
            <strong>graphical user interface (GUI)</strong> and iterating upon
            feedback until a final design was achieved that satisfied the
            established requirements and use cases
          </li>
          <br />
          <li>
            Performing iterative development in <strong>Python</strong>,
            beginning backend with the implementation of a{" "}
            <strong>multi-threaded UDP client-server</strong> program to process
            telemetry messages, and then moving towards frontend with the
            construction of the GUI using Python&apos;s <strong>Tkinter</strong>{" "}
            toolkit
          </li>
          <br />
          <li>
            Testing with my own test client (which contained a simple, parsable
            telemetry message that mimicked an AVSim message) and with{" "}
            <strong>AVSim</strong> itself, and making modifications as needed
            until the expected behavior was achieved
          </li>
        </ul>
      </>
    ),
    reflections: (
      <p>
        This internship was filled with many firsts for me, including working
        full-stack, implementing a multi-threaded client-server, and using Agile
        methodologies. It was an incredible opportunity to apply the
        object-oriented design and systems programming concepts I learned in
        school to building a real-world application, and to be at the forefront
        of aviation as part of the <strong>Modeling and Simulation</strong>{" "}
        team!
      </p>
    ),
  },
  {
    slug: "athenahacks",
    title: "AthenaHacks / USC SOS",
    type: "Hackathon",
    date: "Spring 2021",
    tools: ["javascript", "html", "css", "twilio"],
    overview: (
      <p>
        For <strong>USC&apos;s AthenaHacks</strong> hackathon, I worked in a
        team of four to develop <strong>USC SOS</strong>, a service that
        provides users with a hub of various emergency contacts at USC at their
        fingertips. USC is located near South Los Angeles, Inglewood, and Watts—
        cities known for their high crime and gang rates. While USC offers
        various services to students who may encounter emergencies off campus,
        in a life or death situation, it can be hard to quickly find the right
        person to call for help. <strong>USC SOS</strong> makes it easy to get
        connected quickly by providing a place for all important emergency
        contacts at just a click or call away.
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
