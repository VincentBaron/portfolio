import ServicesCTA from './ServicesCTA';

export default function ServicesMainCTA() {

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Ready to start your 2-week sprint?
          </h2>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Book a call to discuss your project and get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ServicesCTA 
              variant="purple"
              label="Book a Call"
              showCalendar={true}
              className="px-6 py-3 text-base"
            />
            <a
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-600 transition-all duration-200"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </>
  );
}