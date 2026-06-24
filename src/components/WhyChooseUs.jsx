export default function WhyChooseUs() {
  const features = [
    {
      title: "High-Quality Prompts",
      description:
        "Explore expertly crafted AI prompts designed to boost productivity and creativity.",
      icon: "✨",
    },
    {
      title: "Wide Variety",
      description:
        "Discover prompts across multiple categories including writing, coding, design, and business.",
      icon: "📚",
    },
    {
      title: "Trusted Community",
      description:
        "Read reviews, ratings, and feedback from a growing community of creators and users.",
      icon: "🤝",
    },
    {
      title: "Save Time & Effort",
      description:
        "Skip repetitive tasks and get better AI outputs instantly with ready-to-use prompts.",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose AIVerse?
          </h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            AIVerse empowers creators, developers, and professionals with
            premium AI prompts to unlock creativity and achieve more in less
            time.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-default-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-default-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}