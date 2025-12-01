import React from "react";
import Button from "./Button";

export default function MembershipForm() {
  return (
    <div className="max-w-md mx-auto">
      <form
        action="https://formsubmit.co/ucadcesi@gmail.com"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="/merci" />
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="niveau"
            className="block text-sm font-medium text-gray-700"
          >
            Niveau
          </label>
          <input
            type="text"
            id="niveau"
            name="niveau"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="specialite"
            className="block text-sm font-medium text-gray-700"
          >
            Spécialité
          </label>
          <input
            type="text"
            id="specialite"
            name="specialite"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button type="submit" variant="primary" size="large">
          Soumettre la demande d'adhésion
        </Button>
      </form>
    </div>
  );
}
