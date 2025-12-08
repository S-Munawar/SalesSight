import { Heading } from "@/components/atoms";
import { SalesChart } from "@/components/organisms";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <Heading level={1} className="text-gray-900 dark:text-white">
            Sales Dashboard
          </Heading>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and visualize your sales performance over time
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid gap-8">
          {/* Main Chart Section */}
          <section>
            <SalesChart
              title="Annual Sales Overview"
              subtitle="Sales performance data from 2022-2024"
            />
          </section>

          {/* Future Enhancement Placeholders */}
          <section className="grid md:grid-cols-3 gap-6">
            {/* Summary Card Placeholder 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                $209,700
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                2022-2024 combined
              </p>
            </div>

            {/* Summary Card Placeholder 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Average Growth
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                +29.5%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Year over year
              </p>
            </div>

            {/* Summary Card Placeholder 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Best Year
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                2024
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                $89,200 in sales
              </p>
            </div>
          </section>

          {/* Future Features Notice */}
          <section className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              🚀 Coming Soon
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                Real-time API data integration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                Advanced filtering options
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                Export to PDF/Excel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                Comparative analysis tools
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
