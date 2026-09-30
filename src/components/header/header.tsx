"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <motion.header
      className={cn(
        styles.header,
        isActive && styles.headerOpen,
        "z-[1000] transition-[background-color,color,backdrop-filter] duration-500 ease-in-out",
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
        // backgroundImage:
        //   "linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0))",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className={styles.bar}>
        <Link
          href="/"
          className="cursor-can-hover shrink-0 rounded-sm text-sm font-medium text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
          aria-label="Yousif Ahmed home"
        >
          {config.author}
        </Link>

        <div className="flex w-max shrink-0 items-center gap-1 sm:gap-2.5">
          <FunnyThemeToggle className="flex size-8 shrink-0" />
          <OnlineUsers />
          <GitHubStarsButton
            username={config.githubUsername}
            className="h-9 px-2 min-[360px]:px-2.5 sm:h-10 sm:px-3"
            aria-label="Open Yousif Ahmed's GitHub profile and view total repository stars"
          />
          <Button
            variant={"ghost"}
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? "Close menu" : "Open menu"}
            aria-expanded={isActive}
            className={cn(
              styles.el,
              "m-0 flex h-9 items-center justify-center bg-transparent px-1 hover:bg-transparent sm:h-10 sm:px-1.5",
            )}
          >
            <div className="relative hidden h-5 w-10 items-center md:flex">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
                aria-hidden={isActive}
              >
                Menu
              </motion.p>
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                aria-hidden={!isActive}
              >
                Close
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </Button>
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        onClick={() => setIsActive(false)}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
