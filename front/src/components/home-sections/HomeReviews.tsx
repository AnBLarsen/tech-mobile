import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jane D.",
    text: "Great selection and fast delivery. My new laptop is amazing!",
  },
  {
    name: "Alex P.",
    text: "I love my new wireless headphones. Incredible sound quality!",
  },
  {
    name: "Maria L.",
    text: "The customer service was super helpful. Highly recommend!",
  },
];

export default function HomeReviews() {
  return (
    <section className="py-6 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8">
            What Our Customers Say
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
            <div
                key={i}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative text-left"
            >
            

                <p className="text-gray-700 italic mb-4 px-4">
                    <span className="text-4xl text-gray-300 align-top mr-1">“</span>
                    {t.text}
                    <span className="text-4xl text-gray-300 align-top ml-1">”</span>
                </p>

            
                <div className="flex gap-1 mb-2 pl-6 text-yellow-400">
                {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                    ))}
                </div>

            
                <p className="font-semibold text-blue-800 pl-6">{t.name}</p>
            </div>
            ))}
        </div>
    </section>
  );
}

  