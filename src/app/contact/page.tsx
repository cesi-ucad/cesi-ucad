"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";

  if (success) {
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
                Merci pour votre message !
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Votre message a été envoyé avec succès. Nous vous répondrons
                dans les plus brefs délais.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  En attendant, n'hésitez pas à explorer notre site pour en
                  savoir plus sur nos activités.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    Retour à l'accueil
                  </a>
                  <a
                    href="/club"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    En savoir plus sur le club
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Section title="Contactez-nous" className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 mb-6">
            Pour toute question ou renseignement, envoyez-nous un message via le
            formulaire ci-dessous ou contactez-nous directement par e-mail ou
            téléphone.
          </p>
          <form
            className="grid grid-cols-1 gap-4"
            action="https://formsubmit.co/ucadcesi@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="Nouveau message du site CESI UCAD"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://precious-puppy-6204c6.netlify.app/contact?success=true"
            />
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Nom</span>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Adresse e‑mail
              </span>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </label>
            <div className="flex items-center justify-between mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Envoyer
              </button>
              <div className="text-sm text-gray-600">
                <div>
                  Ou contactez-nous :{" "}
                  <a
                    href="mailto:ucadcesi@gmail.com"
                    className="text-primary-600"
                  >
                    ucadcesi@gmail.com
                  </a>
                </div>
                <div className="mt-1">
                  Téléphone :{" "}
                  <a href="tel:+2210774150964" className="text-primary-600">
                    +221 77 415 09 64
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
