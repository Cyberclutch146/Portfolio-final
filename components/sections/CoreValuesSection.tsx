"use client";

import { motion } from "framer-motion";
import CardSwap, { Card } from "@/components/animations/CardSwap";

export default function CoreValuesSection() {
  return (
    <section className="py-24 border-t border-ink-900 relative overflow-hidden">
      <div className="section-container relative z-10 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <p className="label-mono mb-3 text-signal">my philosophy</p>
          <h2 className="font-display text-4xl font-bold text-ink-50">
            Core Principles
          </h2>
        </motion.div>

        <div className="w-full flex justify-center h-[500px]">
          <CardSwap
             width={400}
             height={300}
             cardDistance={40}
             verticalDistance={30}
             delay={4000}
             pauseOnHover={true}
             skewAmount={4}
          >
            <Card className="bg-ink-900 border border-ink-800 p-8 rounded-2xl flex flex-col justify-center shadow-2xl items-center text-center">
              <h3 className="font-display text-2xl text-signal mb-4">Hardware First</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                Everything starts at the bare metal. Understanding the physical layer allows you to write far better abstractions.
              </p>
            </Card>
            <Card className="bg-ink-900 border border-ink-800 p-8 rounded-2xl flex flex-col justify-center shadow-2xl items-center text-center">
              <h3 className="font-display text-2xl text-circuit mb-4">Always Building</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                Theory is great, but execution is what matters. Whether it's soldering or compiling, building is the best teacher.
              </p>
            </Card>
            <Card className="bg-ink-900 border border-ink-800 p-8 rounded-2xl flex flex-col justify-center shadow-2xl items-center text-center">
              <h3 className="font-display text-2xl text-ink-50 mb-4">Design Matters</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                An expertly engineered backend is completely useless if the frontend interface prevents people from actually using it.
              </p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
