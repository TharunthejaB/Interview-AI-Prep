import React, { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import Button from "../components/Button";
import { APP_FEATURES, HERO_IMG } from "../utils/data";
import Modal from "../components/Modal";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/profileInfoCard";

function Landing() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full">
        <div className="container mx-auto px-4 pt-6 relative z-10">
          <header className="w-full flex justify-between mb-16 items-center">
            <div className="text-xl font-bold text-green-700 cursor-pointer">
              InterviewPrep AI
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <Button
                primary="bg-green-700"
                secondary="hover:bg-black"
                text="Login/Signup"
                onClick={() => {
                  setOpenAuthModal(true);
                  setCurrentPage("login");
                }}
              ></Button>
            )}
          </header>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-24">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className=" w-fit text-sm font-semibold bg-green-200 px-4 py-2 rounded-full border border-green-500 flex items-center gap-1.5 text-green-700">
                <LuSparkles /> AI powered interview
              </div>
              <h1 className="text-5xl text-black font-medium leading-tight">
                Ace interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#48781a_0%,#b4e388_100%)] bg-size-[200%_200%] animate-text-shine font-semibold">
                  AI powered
                </span>{" "}
                learning
              </h1>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-start justify-between">
              <p className="text-xl mr-0 mb-6 font-medium">
                Get role-spceific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery, your ultimate interview toolkit is
                here.
              </p>

              <Button
                primary="bg-black"
                secondary="hover:bg-green-700"
                text="Get started"
                onClick={() => {
                  setOpenAuthModal(true);
                  setCurrentPage("login");
                }}
              ></Button>
            </div>
          </div>
          <div className="w-full min-h-full relative z-10 mt-10 mb-10 bg-[#f5ffef] pt-5 md:pt-10 pb-5 md:pb-10 border-4 rounded-lg border-green-100">
            <div>
              <section className="flex items-center justify-center">
                <img
                  src={HERO_IMG}
                  alt="hero image"
                  className="w-[80vw] md:w-[50vw] rounded-lg"
                />
              </section>
            </div>
          </div>
          <div className="w-full min-h-full bg-[#f5ffef] mt-10 mb-10">
            <div className="container mx-auto px-4 pt-10 pb-20">
              <section className="mt-5">
                <h2 className="text-3xl font-semibold text-center mb-12">
                  Features that makes you shine
                </h2>
                <div className="flex flex-col items-center gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {APP_FEATURES.slice(0, 3).map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-[#eafce0] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-green-100 transistion border border-green-100"
                      >
                        <h3 className="text-base font-semibold mb-3">
                          {feature.title}
                        </h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {APP_FEATURES.slice(3).map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-[#eafce0] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-green-100 transistion border border-green-100"
                      >
                        <h3 className="text-base font-semibold mb-3">
                          {feature.title}
                        </h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="w-full bg-green-100 text-center text-base font-medium pt-2 pb-2">
          Made by{" "}
          <span className="text-green-900">
            <a
              className="cursor-pointer"
              href="https://tharuntheja-portfolio.vercel.app/"
              target="_blank"
            >
              Tharun theja Boyalla
            </a>
          </span>
        </div>
      </div>
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false); // reset page when modal closes
          }}
          title={currentPage === "login" ? "Login" : "Sign Up"}
          hideHeader
        >
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </Modal>
      )}
    </>
  );
}

export default Landing;
