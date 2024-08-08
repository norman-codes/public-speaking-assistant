"use client";

import { useState } from "react";
import HumeLogo from "./logos/Hume";
import Github from "./logos/GitHub";
import { Button } from "./ui/button";
import Link from "next/link";
import Modal from "./ui/modal";

export const Nav = () => {
  const [isAboutModalOpen, setisAboutModalOpen] = useState(false);
  const [isHowToModalOpen, setisHowToModalOpen] = useState(false);
  const [isPrivacyModalOpen, setisPrivacyModalOpen] = useState(false);

  return (
    <div className={"px-4 py-2 flex items-center h-14 z-50 bg-transparent"}>
      <div className={"flex-1"}>
        <Link href="https://www.hume.ai/" target="_blank">
          <div>
            <HumeLogo className={"h-5 w-auto"} />
          </div>
        </Link>
      </div>
      <div className={"flex-1 flex justify-center gap-4"}>
        <Button
          className={"font-mono font-bold"}
          variant="link"
          onClick={() => setisAboutModalOpen(true)}
        >
          About
        </Button>
        <Button
          className={"font-mono font-bold"}
          variant="link"
          onClick={() => setisPrivacyModalOpen(true)}
        >
          Privacy
        </Button>
        <Button
          className={"font-mono font-bold"}
          variant="link"
          onClick={() => setisHowToModalOpen(true)}
        >
          How To
        </Button>
      </div>
      <div className={"flex-1 flex justify-end items-center gap-1"}>
        <Link href="https://www.hume.ai/" target="_blank">
          <div>
            <Github className={"h-5 w-auto mr-2"} />
          </div>
        </Link>
      </div>

      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setisAboutModalOpen(false)}
        title="What is this?"
      >
        <p>
          This is an AI public speaking assistant. It uses Hume AI's{" "}
          <a
            target="_blank"
            href="https://www.hume.ai/products#empathicVoiceInterface"
          >
            Empathic Voice Interface
          </a>{" "}
          (EVI) to provide real-time feedback based on inferred expressions in
          the human voice. <br /> <br /> Whether you are preparing for a speech
          or a performance, this tool is here to help you contextualize,
          practice, and improve in your public speaking endeavors.
        </p>
      </Modal>

      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setisPrivacyModalOpen(false)}
        title="Can I practice confidential material?"
      >
        <p>
          <strong>
            No, you should not practice confidential material.
          </strong>
          <br />
          <br />
          For privacy, clone this repository and host the application locally
          with your own API credentials. <br/> <br/> Enable "Do not retain data" and "Do not
          use for training" in your Hume AI account settings. See the{" "}
          <a href="https://platform.hume.ai/settings/profile">
            Hume Portal profile
          </a>{" "}
          for more details.
          <br />
          <br />
          <em>Note: enabling "Do not retain data" will disable resumability.</em>
        </p>
      </Modal>

      <Modal
        isOpen={isHowToModalOpen}
        onClose={() => setisHowToModalOpen(false)}
        title="How do I use it?"
      >
        <p>
          <strong>Contextualize</strong> your session by providing details about
          your speech. <strong>Practice</strong> your speech by saying "Start
          performance". <strong>Get feedback</strong> from the assistant, and
          repeat.
        </p>
        <br />
        <p>You can also use the following voice commands:</p>
        <ul>
          <li>
            <strong>Consent to Conversation</strong>: "I consent to this
            conversation."
          </li>
          <li>
            <strong>Revoke Consent</strong>: "I revoke my consent to this
            conversation."
          </li>
          <li>
            <strong>Mute Assistant</strong>: "Could you mute yourself please?"
          </li>
          <li>
            <strong>Unmute Assistant</strong>: "Please unmute yourself."
          </li>
          <li>
            <strong>Start Performance</strong>: "Start performance."
          </li>
          <li>
            <strong>End Conversation</strong>: "Sorry, I need to go. Could we
            end our conversation here?"
          </li>
          <li>
            <strong>Enter Focus Mode</strong>: "Enter focus mode" or "Can you
            hide the messages?"
          </li>
          <li>
            <strong>Exit Focus Mode</strong>: "Exit focus mode" or "Can you show
            the messages?"
          </li>
          <li>
            <strong>Web Search</strong>: For up-to-date or specific information
            queries, such as "Tell me more about the historical context of Romeo
            and Juliet."
          </li>
        </ul>
      </Modal>
    </div>
  );
};
