/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface GenerateCodeProps {
  nodes: any;
  edges: any;
  flowSummary: { content: string }[];
  setDisplayState: (state: "generate" | "contract") => void;
  appendToSourceCode: (sourceCode: string) => void;
  sourceCode?: string;
  setBlockchain?: (blockchain: string) => void;
  setSourceCode: (sourceCode: string) => void;
}

export default function GenerateCode({
  flowSummary,
  setDisplayState,
  setBlockchain,
  setSourceCode,
}: GenerateCodeProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleGenerate = () => {
    if (selectedOption) {
      if (setBlockchain) {
        setBlockchain(selectedOption);
      }
      setSourceCode("");
      setDisplayState("contract");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-8 p-8 bg-navy-900 rounded-2xl border border-navy-700 relative min-h-[500px] max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365f] shadow-[0_0_20px_rgba(100,255,218,0.1)]"
    >
      <motion.h2
        className="text-4xl font-bold text-cyan-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Confirm Flow Summary?
      </motion.h2>
      <motion.div
        className="bg-navy-800 rounded-xl shadow-inner p-6 border border-white"
        whileHover={{
          style: { boxShadow: "0 0 15px rgba(100, 255, 218, 0.2)" },
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {flowSummary.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 flex items-center"
          >
            <span className="mr-2 text-cyan-400 text-2xl font-bold">
              {index + 1}.
            </span>
            <span className="text-slate-300 text-lg">{item.content}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="text-xl text-cyan-300 font-semibold">
          Select Blockchain:
        </div>
        <select
          id="blockchain-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full h-[48px] bg-gray-800 rounded-md border border-white hover:border-slate-500 text-slate-300 px-3"
          defaultValue=""
        >
          <option value="" disabled>
            Choose a blockchain...
          </option>
          <option value="blockchain1">Starknet</option>
          <option value="blockchain4">Dojo</option>
        </select>
      </div>

      <AnimatePresence>
        {!!selectedOption.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Button
              size="lg"
              onClick={handleGenerate}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-navy-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
              style={{
                boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)",
              }}
            >
              <span className="flex items-center justify-center gap-3">
                <Zap className="w-6 h-6" />
                Continue to Contract Generation
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}