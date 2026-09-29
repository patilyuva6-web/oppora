"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Intro animation
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    // After the Welcome animation finishes, go to Login
    const loginTimer = setTimeout(() => {
      router.push("/login");
    }, 7000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(loginTimer);
    };
  }, [router]);

  return (
    <main className="intro-page">
      {showIntro && (
        <div className="intro">
          <div className="scene">
            <div className="stage">
              <div className="orbit">
                <span className="letter o1">o</span>
                <span className="letter p1">p</span>
                <span className="letter p2">p</span>
                <span className="letter o2">o</span>
                <span className="letter r">r</span>
                <span className="letter a">a</span>
                <span className="letter dot">.</span>
              </div>
            </div>

            <div className="tag">
              DISCOVER WHAT COMES NEXT.
            </div>

            <div className="line"></div>
          </div>
        </div>
      )}

      {!showIntro && (
        <div className="home">
          <h1>Welcome to Oppora</h1>
        </div>
      )}
    </main>
  );
}






