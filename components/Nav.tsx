"use client";

import { useLayoutEffect, useState } from "react";
import HumeLogo from "./logos/Hume";
import Github from "./logos/GitHub";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import Modal from "./ui/modal";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAboutModalOpen, setisAboutModalOpen] = useState(false);
  const [isHowToModalOpen, setisHowToModalOpen] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

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
        <Button variant="ghost" onClick={() => setisAboutModalOpen(true)}>About</Button>
        <Button variant="ghost" onClick={() => setisHowToModalOpen(true)}>How To</Button>
      </div>
      <div className={"flex-1 flex justify-end items-center gap-1"}>
        <Link href="https://www.hume.ai/" target="_blank">
          <div>
            <Github className={"h-5 w-auto mr-2"} />
          </div>
        </Link>
      </div>

      <Modal isOpen={isAboutModalOpen} onClose={() => setisAboutModalOpen(false)} title="About">
        <p>Your content goes here.</p>
      </Modal>

      <Modal isOpen={isHowToModalOpen} onClose={() => setisHowToModalOpen(false)} title="How To">
        <p>Your content goes here.</p>
      </Modal>
    </div>
  );
};
