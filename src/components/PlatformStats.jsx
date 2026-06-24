export default function PlatformStats() {
  const stats = [
    { value: "500+", label: "AI Prompts" },
    { value: "100+", label: "Creators" },
    { value: "2K+", label: "Downloads" },
    { value: "4.8★", label: "Average Rating" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 border rounded-2xl"
            >
              <h3 className="text-4xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="mt-2 text-default-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}