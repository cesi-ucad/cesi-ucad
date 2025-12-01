import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Merci() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Merci pour votre demande !
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Votre demande d'adhésion au CESI UCAD a été envoyée avec succès.
              Nous vous contacterons bientôt pour finaliser votre inscription.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                En attendant, n'hésitez pas à explorer notre site pour en savoir
                plus sur nos activités.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Retour à l'accueil
                </a>
                <a
                  href="/membres"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Voir nos membres
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
