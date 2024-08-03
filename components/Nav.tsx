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
        <Button className={"font-mono font-bold"} variant="link" onClick={() => setisAboutModalOpen(true)}>About</Button>
        <Button className={"font-mono font-bold"} variant="link" onClick={() => setisHowToModalOpen(true)}>How To</Button>
      </div>
      <div className={"flex-1 flex justify-end items-center gap-1"}>
        <Link href="https://www.hume.ai/" target="_blank">
          <div>
            <Github className={"h-5 w-auto mr-2"} />
          </div>
        </Link>
      </div>

      <Modal isOpen={isAboutModalOpen} onClose={() => setisAboutModalOpen(false)} title="What is this?">
        <p>About the application.</p>
        <p>This will contain information about what this is used for and demonstrates.</p>
      </Modal>

      <Modal isOpen={isHowToModalOpen} onClose={() => setisHowToModalOpen(false)} title="How do I use it?">
        <p>Your content goes here.</p>
      </Modal>
    </div>
  );
};
