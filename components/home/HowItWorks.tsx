
type Step = {
  _id: string;
  number: number;
  title: string;
  description: string;
};

async function getSteps(): Promise<Step[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/steps`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch steps");
    }

    return res.json();
  } catch (error) {
    console.error("Steps error:", error);
    return [];
  }
}

export default async function HowItWorks() {
  const steps = await getSteps();

  return (
    <section
      id="how-it-works"
      className="bg-[#efeee8] dark:bg-[#292e28] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
            Simple Process
          </p>

          <h2 className="font-heading text-4xl font-medium text-foreground md:text-5xl">
            How It Works
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Finding and booking your ideal creative space is easier than you
            think.
          </p>
        </div>

        {steps.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            Steps are currently unavailable.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step._id} className="relative">
                <p className="mb-5 font-heading text-5xl font-medium text-[#a8b5a0]">
                  {String(step.number).padStart(2, "0")}
                </p>

                <h3 className="mb-3 font-heading text-2xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
