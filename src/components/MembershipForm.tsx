"use client";

import React, { useState } from "react";
import Button from "./Button";

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    niveau: "",
    specialite: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: replace with API call if needed
    alert("Demande d'adhésion soumise !");
    setFormData({ nom: "", email: "", niveau: "", specialite: "" });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={formData.nom}
            onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
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
            value={formData.niveau}
            onChange={handleInputChange}
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
            value={formData.specialite}
            onChange={handleInputChange}
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
